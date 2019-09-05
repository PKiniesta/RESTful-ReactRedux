import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInOK(type) {
  return type.substring(type.length - 3) === "_OK";
}

export default function apiStatusReducer(
  state = initialState.apiCalls,
  action
) {
  if (action.type == types.API_CALL) {
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERR ||
    actionTypeEndsInOK(action.type)
  ) {
    return state - 1;
  }
  return state;
}
