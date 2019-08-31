import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default (state = initialState.auth, action = {}) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        isAuthenticated: action.user ? true : false,
        user: action.user
      };
    default:
      return state;
  }
};
