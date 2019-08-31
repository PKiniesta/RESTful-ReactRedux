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
    // for simple reducers if is good
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERR || // when api got error , redux didint notice that , and didnt decrement api call
    actionTypeEndsInOK(action.type)
  ) {
    return state - 1;
  }
  return state;
}

//remember to add reducers to our index.js root reducer. If i ever set breakpoint in reducer and u see he is never called , that is most likely that we forgot to add him to root reducer
