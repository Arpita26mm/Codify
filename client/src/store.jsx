import React, { createContext, useState, useContext } from "react";

// Initial state
const initialState = {
  user: null,
  token: null,
};

// Create context
const StoreContext = createContext();

// Custom hook for using the context
export const useStore = () => useContext(StoreContext);

// Context provider component
export const StoreProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const login = (user, token) => {
    setState({ user, token });
  };

  const logout = () => {
    setState({ user: null, token: null });
  };

  return (
    <StoreContext.Provider value={{ state, login, logout }}>
      {children}
    </StoreContext.Provider>
  );
};
