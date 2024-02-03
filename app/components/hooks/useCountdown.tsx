import { useEffect, useState } from "react";

// could potentially be reused in multiple components
export function useCountdown(initialCountdown?: number) {
  const [countdown, setCountdown] = useState(initialCountdown || 0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // cleanup setInterval
    return () => {
      clearInterval(timer);
    };
  }, []);

  return countdown;
}
