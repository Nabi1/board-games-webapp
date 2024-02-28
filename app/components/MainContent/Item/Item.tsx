import React from "react";

import { Countdown } from "./Countdown/Countdown";
import { Dropdown } from "../Dropdown/Dropdown";
import { Icon } from "./Icon";
import { Props } from "./types";

export function Item({ item, setOpenModalId, setSelectedBoardGame }: Props) {
  return (
    <li
      key={item.id}
      className="bg-white border rounded-xl p-8 shadow-md flex flex-col gap-6"
    >
      <div className="flex justify-between">
        <Icon />
        <Dropdown
          boardGameId={item.id}
          setOpenModalId={setOpenModalId}
          setSelectedBoardGame={setSelectedBoardGame}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold text-lg">{item.name}</p>
      </div>
      <ul
        data-testid="category-list-container"
        className="flex items-center gap-1 flex-wrap"
      >
        {item.manifest.tags.categories.map((category, index) => (
          <li
            key={index}
            className="inline-block bg-white border-2 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-1 mb-1"
          >
            {category}
          </li>
        ))}
      </ul>

      <Countdown initialCountdown={item.nextPartyIn} />
    </li>
  );
}
