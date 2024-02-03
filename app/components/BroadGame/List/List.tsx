import React, { useState, useContext, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { DashboardContext } from "../../../contexts/DashboardProvider";
import { BroadGameType } from "../../../types";
import { Item } from "../Item/Item";
import { Modal } from "../Modal/Modal";
import { NotResultIcon } from "./NotResultIcon";

export function List() {
  const { state } = useContext(DashboardContext);
  const [openModalId, setOpenModalId] = useState("");

  const [selectedBoardGame, setSelectedBoardGame] = useState<BroadGameType>({
    id: "",
    name: "",
    manifest: { tags: { categories: [] } },
  });

  const searchParams = useSearchParams();
  const categoryFilter = searchParams?.get("category");
  const { searchTerm, boardGames } = state;

  const filterBoardGamesBySearchTerm = useCallback(
    (boardGames: BroadGameType[]) => {
      const regex = new RegExp(searchTerm, "i");
      return boardGames.filter((boardGame) => {
        return regex.test(boardGame.name);
      });
    },
    [searchTerm]
  );

  const filterBoardGamesByCategory = useCallback(
    (boardGames: BroadGameType[]) => {
      return boardGames.filter((boardGame) => {
        return categoryFilter
          ? boardGame.manifest.tags.categories.includes(categoryFilter)
          : true;
      });
    },
    [categoryFilter]
  );

  const filteredBoardGames = filterBoardGamesByCategory(
    filterBoardGamesBySearchTerm(boardGames)
  );

  const boardGamesLength = boardGames.length;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="flex w-full flex-col gap-4">
        <p className="flex justify-end">
          You are viewing {filteredBoardGames.length} out of {boardGamesLength}{" "}
          boardGames
        </p>
        {filteredBoardGames.length > 0 ? (
          <ul data-testid="boardGame-list" className="flex flex-col gap-4">
            {filteredBoardGames.map((boardGame) => (
              <Item
                key={boardGame.id}
                item={boardGame}
                setSelectedBoardGame={setSelectedBoardGame}
                setOpenModalId={setOpenModalId}
              />
            ))}
          </ul>
        ) : (
          <div className="flex gap-2 rounded-lg flex-col bg-custom-white items-center h-full justify-center">
            <NotResultIcon />
            <p className="font-bold text-lg">No boardGame found!</p>
          </div>
        )}
        {openModalId && (
          <Modal
            openModalId={openModalId}
            setOpen={setOpenModalId}
            boardGameId={selectedBoardGame.id}
            boardGameName={selectedBoardGame.name}
          />
        )}
      </section>
      {/* </section> */}
    </Suspense>
  );
}
