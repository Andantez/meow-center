import {
  SET_GRIDVIEW,
  SET_LISTVIEW,
  FILTERS_MODAL_OPEN,
  FILTERS_MODAL_CLOSE,
  LOAD_BREEDS,
  UPDATE_SORT,
  SORT_BREEDS,
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

    case UPDATE_SORT:
      return { ...state, sort: action.payload };

    case SORT_BREEDS:
      const { sort, filteredBreeds } = state;
      let tempBreeds = [];
      if (sort === 'z-a') {
        tempBreeds = filteredBreeds.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        return { ...state, filteredBreeds: tempBreeds };
      }
      if (sort === 'a-z') {
        tempBreeds = filteredBreeds.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        return { ...state, filteredBreeds: tempBreeds };
      }

    default:
      return state;
  }
};

export default reducer;
