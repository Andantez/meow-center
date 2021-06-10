import { createContext, useContext, useReducer } from 'react';
import reducer from '../reducers/filters_reducer';
import  { SET_GRIDVIEW, SET_LISTVIEW }  from '../actions/actions';

const InitialState = {
  gridView: true,
};

const FiltersContext = createContext();

const FiltersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const setGridView = () => {
    dispatch({type: SET_GRIDVIEW})
  }
  const setListView = () => {
    dispatch({type: SET_LISTVIEW})
  }
  return (
    <FiltersContext.Provider value={{...state, setGridView, setListView}}>
      {children}
    </FiltersContext.Provider>
  );
};


export const useFiltersContext = () => {
  return useContext(FiltersContext);
}
export default FiltersProvider;
