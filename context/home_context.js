import { createContext, useContext, useState } from 'react';
import useSWR from 'swr';

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [itsOnFocus, setItsOnFocus] = useState(false);
  const { data: searchResults } = useSWR(
    () => query ? `https://api.thecatapi.com/v1/breeds/search?q=${query}` : null
  );
  
  const isLoadingData = !searchResults && query.length > 0;
  const noResultsFound =
    searchResults?.length === 0 && query.length > 0 && itsOnFocus;

  // console.log("is loading", isLoading, "nqma resultati", noResultsFound);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const setUserQuery = (userQuery) => {
    setQuery(userQuery);
  };
  const setFocus = () => {
    setItsOnFocus(true);
  };
  const setBlur = () => {
    setItsOnFocus(false);
  };
  return (
    <HomeContext.Provider
      value={{
        openSidebar,
        closeSidebar,
        isSidebarOpen,
        setUserQuery,
        searchResults,
        query,
        setFocus,
        setBlur,
        itsOnFocus,
        isLoadingData,
        noResultsFound,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  return useContext(HomeContext);
};
export default HomeProvider;
