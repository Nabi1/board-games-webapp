import React, { useRef, useState, useContext, useEffect } from "react";
import Link from "next/link";
import arrowRightCircle from "react-useanimations/lib/arrowRightCircle";
import copyAnimation from "react-useanimations/lib/copy";
import editAnimation from "react-useanimations/lib/edit";
import menuAnimation from "react-useanimations/lib/menu3";
import trashAnimation2 from "react-useanimations/lib/trash2";
import UseAnimations from "react-useanimations";

import { DashboardContext } from "../../../contexts/DashboardProvider";
import { Props } from "./types";

export function Dropdown({
  phantomId,
  setOpenModalId,
  setSelectedPhantom,
}: Props) {
  const { state, dispatch } = useContext(DashboardContext);
  const [isOpen, setIsOpen] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  const dropDownRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: { target: any }) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setAutoplay(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenModal = (id: string) => {
    const phantom = state.phantoms.find((item) => item.id === id);
    if (phantom) {
      setSelectedPhantom(phantom);
      setOpenModalId(id);
    }
    setIsOpen(false);
  };

  const handleDuplicate = (id: string) => {
    const itemToDuplicate = state.phantoms.find((item) => item.id === id);
    if (!itemToDuplicate) {
      return;
    }
    const newId = Math.random().toString();
    const duplicatedItem = { ...itemToDuplicate, id: newId };
    dispatch({ type: "DUPLICATE", payload: duplicatedItem });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch({ type: "DELETE", payload: { id } });
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setAutoplay(!autoplay);
  };

  return (
    <div className="relative inline-block text-left" ref={dropDownRef}>
      <button
        onClick={toggleDropdown}
        className="rounded-full w-9 h-9 inline-flex items-center justify-center bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        <UseAnimations
          key={`${autoplay}`} // hack to force re-render since react-useanimations seems buggy
          animation={menuAnimation}
          size={20}
          autoplay={autoplay}
        />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            <button
              className="text-gray-700 justify-between	w-full  flex px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => handleOpenModal(phantomId)}
            >
              Rename
              <UseAnimations animation={editAnimation} size={20} />
            </button>
            <button
              className="text-gray-700 justify-between	w-full flex px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => handleDuplicate(phantomId)}
            >
              Duplicate
              <UseAnimations animation={copyAnimation} size={20} />
            </button>
            <hr />
            <Link
              href={`/phantom/${phantomId}`}
              className="text-gray-700 justify-between	w-full flex px-4 py-2 text-sm hover:bg-gray-100"
            >
              Get details
              <UseAnimations animation={arrowRightCircle} size={20} />
            </Link>
            <hr />
            <button
              className="text-red-500 w-full justify-between flex px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => handleDelete(phantomId)}
            >
              Delete
              <UseAnimations
                animation={trashAnimation2}
                strokeColor="red"
                autoplay={true}
                size={20}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
