import React, { createContext } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  return <WishlistContext.Provider value={{}}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => React.useContext(WishlistContext);
