import { createContext, useContext, useState } from 'react';

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const openSidebar = () => {
    setIsSidebarOpen(true);
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }
  
  return (
    <HomeContext.Provider value={{openSidebar, closeSidebar, isSidebarOpen}}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  return useContext(HomeContext);
};
export default HomeProvider;
