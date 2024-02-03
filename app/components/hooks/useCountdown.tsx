import { useEffect, useState, useRef } from "react";

export function useCountdown(initialCountdown?: number) {
  const [countdown, setCountdown] = useState(initialCountdown || 0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown - 1 <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return countdown;
}
