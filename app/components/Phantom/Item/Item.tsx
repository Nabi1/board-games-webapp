import React from "react";

import { Countdown } from "./Countdown";
import { Dropdown } from "../Dropdown/Dropdown";
import { Icon } from "./Icon";
import { Props } from "./types";

export function Item({ item, setOpenModalId, setSelectedPhantom }: Props) {
  return (
    <section
      key={item.id}
      className="bg-white border rounded-xl p-8 shadow-md flex flex-col gap-6"
    >
      <div className="flex justify-between">
        <Icon />
        <Dropdown
          phantomId={item.id}
          setOpenModalId={setOpenModalId}
          setSelectedPhantom={setSelectedPhantom}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold text-lg">{item.name}</p>
        <p className="text-gray-500 text-sm">{item.script}</p>
      </div>
      <ul className="flex items-center gap-1 flex-wrap">
        {item.manifest.tags.categories.map((category, index) => (
          <li
            key={index}
            className="inline-block bg-white border-2 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-1 mb-1"
          >
            {category}
          </li>
        ))}
      </ul>
      {item.repeatedLaunchTimes?.simplePreset ? (
        <Countdown
          simplePreset={item.repeatedLaunchTimes.simplePreset}
          initialCountdown={item.nextLaunchIn}
        />
      ) : (
        <p className="text-gray-500 text-sm">{item.launchType}</p>
      )}
    </section>
  );
}
