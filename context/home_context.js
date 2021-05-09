import { createContext, useContext } from 'react';

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  return (
    <HomeContext.Provider value="Hello">
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  return useContext(HomeContext);
};
export default HomeProvider;
