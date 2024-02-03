import { IPhantom } from "app/types";

export type Props = {
  item: IPhantom;
  setOpenModalId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedPhantom: React.Dispatch<React.SetStateAction<IPhantom>>;
};
