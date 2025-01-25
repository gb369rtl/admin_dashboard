// src/context/AppContext.js
import { createContext, useReducer } from "react";
import { initialData } from "../data";

export const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case "DELETE_USER":
      return { ...state, users: state.users.filter((user) => user.id !== action.payload) };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialData);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
