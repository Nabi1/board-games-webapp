import { BroadGameType } from "app/types";

export type Props = {
  item: BroadGameType;
  setOpenModalId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedBoardGame: React.Dispatch<React.SetStateAction<BroadGameType>>;
};
