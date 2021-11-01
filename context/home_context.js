import { createContext, useContext, useEffect, useState } from 'react';

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [itsOnFocus, setItsOnFocus] = useState(false);
  const [breeds, setBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const isLoadingData = !filteredBreeds && query.length > 0;
  const noResultsFound =
    filteredBreeds?.length === 0 && query.length > 0 && itsOnFocus;

  useEffect(() => {
    const filteredData = query ? breeds.filter(breed => breed.name.toLowerCase().includes(query)): [];
    setFilteredBreeds(filteredData);
  }, [query]);

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

  const setData = (data) => {
    setBreeds(data);
  };

  const setMostPopularBreeds = (data) => {
    setMostPopular(data);
  }

  return (
    <HomeContext.Provider
      value={{
        openSidebar,
        closeSidebar,
        isSidebarOpen,
        setUserQuery,
        query,
        setFocus,
        setBlur,
        itsOnFocus,
        isLoadingData,
        noResultsFound,
        setData,
        filteredBreeds,
        setFilteredBreeds,
        setMostPopularBreeds,
        mostPopular
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
