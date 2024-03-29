import { memo } from "react";
import activityAnimation from "react-useanimations/lib/activity";
import UseAnimations from "react-useanimations";

// Here I'm use memorization to avoid re-rendering the component
export const RenamingTime = memo(function animation() {
  return (
    <>
      Next party in |
      <UseAnimations
        animation={activityAnimation}
        strokeColor="green"
        autoplay={true}
        size={25}
      />
    </>
  );
});
