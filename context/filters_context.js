import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/filters_reducer';
import temperamentList from '../data/temperamentList';
import {
  SET_GRIDVIEW,
  SET_LISTVIEW,
  FILTERS_MODAL_OPEN,
  FILTERS_MODAL_CLOSE,
  LOAD_BREEDS,
  UPDATE_SORT,
  SORT_BREEDS,
  UPDATE_FILTERS,
} from '../actions/actions';

const InitialState = {
  gridView: true,
  isFiltersModalOpen: false,
  allBreeds: [],
  filteredBreeds: [],
  sort: 'a-z',
  filters: {
    origin: 'all',
    temperaments: temperamentList,
    query: '',
  },
};

const FiltersContext = createContext();

const FiltersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const openFiltersModal = () => {
    dispatch({ type: FILTERS_MODAL_OPEN });
  };

  const closeFiltersModal = () => {
    dispatch({ type: FILTERS_MODAL_CLOSE });
  };

  const loadBreeds = (data) => {
    dispatch({ type: LOAD_BREEDS, payload: data });
  };

  const updateSort = (event) => {
    dispatch({ type: UPDATE_SORT, payload: event.target.value });
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    const checked = e.target.checked
      if (e.target.type === 'checkbox') {
        name = "temperaments"
      }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value, checked } });
  };
  useEffect(() => {
    dispatch({ type: SORT_BREEDS });
  }, [state.sort]);
  return (
    <FiltersContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        openFiltersModal,
        closeFiltersModal,
        loadBreeds,
        updateSort,
        dispatch,
        updateFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => {
  return useContext(FiltersContext);
};
export default FiltersProvider;
