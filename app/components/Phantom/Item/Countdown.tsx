import activityAnimation from "react-useanimations/lib/activity";
import UseAnimations from "react-useanimations";

import { useCountdown } from "../../hooks/useCountdown";
import { memo } from "react";

// Here I'm use memorization to avoid re-rendering the component
export const Animation = memo(function animation({
  simplePreset,
}: {
  simplePreset: string;
}) {
  return (
    <>
      {simplePreset} |
      <UseAnimations
        animation={activityAnimation}
        strokeColor="green"
        autoplay={true}
        size={25}
      />
    </>
  );
});

export const Countdown = ({
  simplePreset,
  initialCountdown,
}: {
  initialCountdown?: number;
  simplePreset: string;
}) => {
  const countdown = useCountdown(initialCountdown);

  return (
    <span className="text-gray-500 text-sm gap-4 flex items-center">
      <Animation simplePreset={simplePreset} />
      {/* Since Animation is memoïzed, only countdown is rerender */}
      {countdown} seconds
    </span>
  );
};
