import { useCountdown } from "../../../hooks/useCountdown";
import { RenamingTime } from "./RenamingTime";

export const Countdown = ({
  initialCountdown,
}: {
  initialCountdown?: number;
}) => {
  const countdown = useCountdown(initialCountdown);

  return (
    <span className="text-gray-500 text-sm gap-4 flex items-center">
      <RenamingTime />
      {/* Since RenamingTime is memoïzed, only countdown is rerender */}
      {countdown} seconds
    </span>
  );
};
