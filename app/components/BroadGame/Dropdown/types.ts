import { BroadGameType } from "app/types";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  boardGameId: string;
  setOpenModalId: Dispatch<SetStateAction<string>>;
  setSelectedBoardGame: Dispatch<SetStateAction<BroadGameType>>;
};
