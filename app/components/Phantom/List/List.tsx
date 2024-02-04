import React, { useState, useContext, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { DashboardContext } from "../../../contexts/DashboardProvider";
import { Modal } from "../Modal/Modal";
import { Item } from "../Item/Item";
import { IPhantom } from "../../../types";

export function List() {
  const { state } = useContext(DashboardContext);
  const [openModalId, setOpenModalId] = useState("");

  const [selectedPhantom, setSelectedPhantom] = useState<IPhantom>({
    id: "",
    name: "",
    script: "",
    manifest: { tags: { categories: [] } },
    launchType: "manually",
  });

  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const { searchTerm, phantoms } = state;

  const filterPhantomsBySearchTerm = useCallback(
    (phantoms: IPhantom[]) => {
      const regex = new RegExp(searchTerm, "i");
      return phantoms.filter((phantom) => {
        return regex.test(phantom.name) || regex.test(phantom.script);
      });
    },
    [searchTerm]
  );

  const filterPhantomsByCategory = useCallback(
    (phantoms: IPhantom[]) => {
      return phantoms.filter((phantom) => {
        return categoryFilter
          ? phantom.manifest.tags.categories.includes(categoryFilter)
          : true;
      });
    },
    [categoryFilter]
  );

  const filteredPhantoms = filterPhantomsByCategory(
    filterPhantomsBySearchTerm(phantoms)
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div data-testid="phantom-list" className="flex w-full flex-col gap-4">
        {filteredPhantoms.length > 0 ? (
          filteredPhantoms.map((phantom) => (
            <Item
              key={phantom.id}
              item={phantom}
              setSelectedPhantom={setSelectedPhantom}
              setOpenModalId={setOpenModalId}
            />
          ))
        ) : (
          <p className="flex items-center justify-center">No phantom found</p>
        )}
        {openModalId && (
          <Modal
            openModalId={openModalId}
            setOpen={setOpenModalId}
            phantomId={selectedPhantom.id}
            phantomName={selectedPhantom.name}
          />
        )}
      </div>
    </Suspense>
  );
}
