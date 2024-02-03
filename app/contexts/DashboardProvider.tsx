import { createContext, useReducer, useEffect } from "react";

import { IPhantom } from "../types";
import { Action } from "./types";
import {
  INITIALIZE,
  DUPLICATE,
  DELETE,
  MODIFY,
  SET_SEARCH_TERM,
  RESET,
} from "./contantes";

// Initial state
const initialState: { phantoms: IPhantom[]; searchTerm: string } = {
  phantoms: [],
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
      return { ...state, phantoms: action.payload };
    case DUPLICATE:
      return { ...state, phantoms: [...state.phantoms, { ...action.payload }] };
    case DELETE:
      return {
        ...state,
        phantoms: state.phantoms.filter(
          (item: IPhantom) => item.id !== action.payload.id
        ),
      };
    case MODIFY:
      return {
        ...state,
        phantoms: state.phantoms.map((item) =>
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
    const localStorageData = localStorage.getItem("phantoms");

    if (localStorageData) {
      dispatch({ type: "INITIALIZE", payload: JSON.parse(localStorageData) });
    } else {
      // Fetch data from fake remote and save to localStorage
      fetch("/api/mock/phantoms.json")
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("phantoms", JSON.stringify(data));
          dispatch({ type: "INITIALIZE", payload: data });
        });
    }
  }, []);

  useEffect(() => {
    if (state.phantoms.length > 0) {
      localStorage.setItem("phantoms", JSON.stringify(state.phantoms));
    }
  }, [state.phantoms]);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};
