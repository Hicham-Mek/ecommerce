import React, { createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
