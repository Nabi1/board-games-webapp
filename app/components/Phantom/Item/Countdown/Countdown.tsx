import { useCountdown } from "../../../hooks/useCountdown";
import { RenamingTime } from "./RenamingTime";

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
      <RenamingTime simplePreset={simplePreset} />
      {/* Since RenamingTime is memoïzed, only countdown is rerender */}
      {countdown} seconds
    </span>
  );
};
