import React, { useState, useEffect } from "react";

export const Context = React.createContext();

const Store = ({ children }) => {
  const [errorLogin, setErrorLogin] = useState("");
  const [loadingIndicator, setLoadingIndicator] = useState(false);

  return (
    <Context.Provider
      value={{
        errorLogin: [errorLogin, setErrorLogin],
        loadingIndicator: [loadingIndicator, setLoadingIndicator],
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Store;
