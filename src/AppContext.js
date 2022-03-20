import React from "react";

export const AppContext = React.createContext({
  FIRUser: {},
  setFIRUser: () => {},
  user: {},
  setUser: () => {},
  error: {},
  setError: () => {},
});
