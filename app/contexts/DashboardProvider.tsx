import { createContext, useReducer, useEffect } from "react";

import { BroadGameType } from "../types";
import { Action } from "./types";
import {
  INITIALIZE,
  DUPLICATE,
  DELETE,
  MODIFY,
  SET_SEARCH_TERM,
  RESET,
} from "./contants";

// Initial state
const initialState: { boardGames: BroadGameType[]; searchTerm: string } = {
  boardGames: [],
  searchTerm: "",
};

// Create context
export const DashboardContext = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer
export const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case INITIALIZE:
      return { ...state, boardGames: action.payload };
    case DUPLICATE:
      return {
        ...state,
        boardGames: [...state.boardGames, { ...action.payload }],
      };
    case DELETE:
      return {
        ...state,
        boardGames: state.boardGames.filter(
          (item: BroadGameType) => item.id !== action.payload.id
        ),
      };
    case MODIFY:
      return {
        ...state,
        boardGames: state.boardGames.map((item) =>
          item.id === action.payload.id
            ? { ...item, name: action.payload.name }
            : item
        ),
      };
    case SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

// Provider
export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load data from localStorage or remote
  useEffect(() => {
    const localStorageData = localStorage.getItem("boardGames");

    if (localStorageData) {
      dispatch({ type: "INITIALIZE", payload: JSON.parse(localStorageData) });
    } else {
      // Fetch data from fake remote and save to localStorage
      fetch("api/boardgames")
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("boardGames", JSON.stringify(data));
          dispatch({ type: "INITIALIZE", payload: data });
        });
    }
  }, []);

  useEffect(() => {
    if (state.boardGames.length > 0) {
      localStorage.setItem("boardGames", JSON.stringify(state.boardGames));
    }
  }, [state.boardGames]);
  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};
