import { createContext, useState } from "react";

export const CaptainContext = createContext();

export const CaptainContextProvider = ({ children }) => {
  const [captain, setCaptain] = useState({});

  return (
    <CaptainContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainContext.Provider>
  );
};
