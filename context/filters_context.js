import { createContext, useContext, useReducer } from 'react';
import reducer from '../reducers/filters_reducer';
const InitialState = {
  gridView: true,
};

const FiltersContext = createContext();

const FiltersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  return (
    <FiltersContext.Provider value={{dispatch, state}}>
      {children}
    </FiltersContext.Provider>
  );
};


export const useFiltersContext = () => {
  return useContext(FiltersContext);
}
export default FiltersProvider;
