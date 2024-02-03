import { IPhantom } from "app/types";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  phantomId: string;
  setOpenModalId: Dispatch<SetStateAction<string>>;
  setSelectedPhantom: Dispatch<SetStateAction<IPhantom>>;
};
