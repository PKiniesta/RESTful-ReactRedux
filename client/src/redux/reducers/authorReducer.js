import * as types from "../actions/actionTypes";
import initialState from "./initialState";
export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_OK:
      return action.authors;

    case types.CREATE_AUTHOR_OK:
      return [...state, { ...action.author }];

    case types.DELETE_AUTHOR_NO_API_WAITING:
      return state.filter(author => author._id !== action.author._id);
    default:
      return state;
  }
}
