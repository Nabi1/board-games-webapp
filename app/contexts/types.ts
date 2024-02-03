import { IPhantom } from "../types";
import {
  INITIALIZE,
  DUPLICATE,
  DELETE,
  MODIFY,
  SET_SEARCH_TERM,
  RESET,
} from "./contantes";

type InitializeAction = { type: typeof INITIALIZE; payload: IPhantom[] };
type DuplicateAction = { type: typeof DUPLICATE; payload: IPhantom };
type DeleteAction = { type: typeof DELETE; payload: { id: string } };
type ModifyAction = {
  type: typeof MODIFY;
  payload: { id: string; name: string };
};
type SetSearchTermAction = { type: typeof SET_SEARCH_TERM; payload: string };
type ResetAction = { type: typeof RESET };

export type Action =
  | InitializeAction
  | DuplicateAction
  | DeleteAction
  | ModifyAction
  | SetSearchTermAction
  | ResetAction;
