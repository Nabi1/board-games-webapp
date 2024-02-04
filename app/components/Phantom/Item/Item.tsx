import React from "react";
import activityAnimation from "react-useanimations/lib/activity";
import UseAnimations from "react-useanimations";

import { Dropdown } from "../Dropdown/Dropdown";
import { Icon } from "./Icon";
import { Props } from "./types";
import { useCountdown } from "../../hooks/useCountdown";

export function Item({ item, setOpenModalId, setSelectedPhantom }: Props) {
  const countdown = useCountdown(item.nextLaunchIn);

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
        <span className="text-gray-500 text-sm gap-4 flex items-center">
          {item.repeatedLaunchTimes.simplePreset} |
          {item.nextLaunchIn && (
            <UseAnimations
              animation={activityAnimation}
              strokeColor="green"
              autoplay={true}
              size={25}
            />
          )}
          {` in ${countdown} seconds`}
        </span>
      ) : (
        <p className="text-gray-500 text-sm">{item.launchType}</p>
      )}
    </section>
  );
}
