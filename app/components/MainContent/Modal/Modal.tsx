import { useRef, useContext, useState, useEffect, useCallback } from "react";

import { DashboardContext } from "../../../contexts/DashboardProvider";
import { Props } from "./types";

export function Modal({
  setOpen,
  openModalId,
  boardGameId,
  boardGameName,
}: Props) {
  const { dispatch } = useContext(DashboardContext);
  const [inputValue, setInputValue] = useState(boardGameName);

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const closeModal = useCallback(() => {
    setOpen("");
    setInputValue(boardGameName);
  }, [setOpen, boardGameName]);

  const handleOutsideClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    },
    [closeModal]
  );
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const handleSave = () => {
    dispatch({
      type: "MODIFY",
      payload: { id: boardGameId, name: inputValue },
    });
    closeModal();
  };

  return (
    <div
      className={`fixed inset-0 bg-custom-gray w-max-[700px] bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center ${
        openModalId === boardGameId ? "" : "hidden"
      }`}
      onClick={(e) => handleOutsideClick(e)}
    >
      <div
        className="bg-white flex flex-col gap-3 p-6 rounded-lg shadow-lg w-full max-w-[560px]"
        ref={modalRef}
      >
        <h1 className="text-xl font-bold">Edit Board Game name</h1>
        <h2 className="text-base">Board Game name</h2>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            }
          }}
          className="border rounded-lg border-gray-300 p-3 my-2 w-full"
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded-3xl border border-custom-blue hover:text-custom-gray text-custom-blue hover:bg-custom-blue transition"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-3xl bg-custom-blue text-white hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
