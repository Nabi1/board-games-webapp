import { useContext, useState } from "react";
import UseAnimations from "react-useanimations";
import trashAnimation from "react-useanimations/lib/trash2";

import { DashboardContext } from "../contexts/DashboardProvider";

export const ResetButton = () => {
  const { dispatch } = useContext(DashboardContext);
  const [autoplay, setAutoplay] = useState(false);

  const fetchData = async () => {
    const response = await fetch("/api/mock/phantoms.json");
    const data = await response.json();
    localStorage.setItem("phantoms", JSON.stringify(data));
    dispatch({ type: "INITIALIZE", payload: data });
  };

  const resetAndReload = () => {
    localStorage.removeItem("phantoms");
    fetchData();
  };

  const triggerAnimation = () => {
    setAutoplay(true);
    setTimeout(() => setAutoplay(false), 1500);
  };

  const handleClick = () => {
    resetAndReload();
    triggerAnimation();
  };

  return (
    <button className="flex w-full gap-4 justify-end" onClick={handleClick}>
      Reset Cache and Reload API
      <UseAnimations
        key={`${autoplay}`} // hack to force re-render since react-useanimations seems buggy
        animation={trashAnimation}
        size={20}
        autoplay={autoplay}
      />
    </button>
  );
};
