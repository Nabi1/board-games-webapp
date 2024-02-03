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
    <div
      key={item.id}
      className="bg-white border rounded-xl flex gap-2 p-8 shadow-md relative"
    >
      <div className="flex flex-col gap-6 flex-grow">
        <Icon />
        <div className="flex flex-col gap-1">
          <p className="font-bold text-lg">{item.name}</p>
          <p className="text-gray-500 text-sm">{item.script}</p>
        </div>
        <div className="flex items-center gap-1">
          {item.manifest.tags.categories.map((category, index) => (
            <span
              key={index}
              className="inline-block bg-white border-2 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-1 mb-1"
            >
              {category}
            </span>
          ))}
        </div>
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
      </div>
      <Dropdown
        phantomId={item.id}
        setOpenModalId={setOpenModalId}
        setSelectedPhantom={setSelectedPhantom}
      />
    </div>
  );
}
