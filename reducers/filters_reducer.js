import {
  SET_GRIDVIEW,
  SET_LISTVIEW,
  FILTERS_MODAL_OPEN,
  FILTERS_MODAL_CLOSE,
  LOAD_BREEDS,
} from '../actions/actions';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_GRIDVIEW:
      return { ...state, gridView: true };
    case SET_LISTVIEW:
      return { ...state, gridView: false };

    case FILTERS_MODAL_OPEN:
      return { ...state, isFiltersModalOpen: true };

    case FILTERS_MODAL_CLOSE:
      return { ...state, isFiltersModalOpen: false };
    case LOAD_BREEDS:
      return {
        ...state,
        allBreeds: action.payload,
        filteredBreeds: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
