import { SET_GRIDVIEW, SET_LISTVIEW } from '../actions/actions';

const reducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case SET_GRIDVIEW:
      return { ...state, gridView: true };
    case SET_LISTVIEW:
      return { ...state, gridView: false };

      
    default:
      return state;
  }
};

export default reducer;
