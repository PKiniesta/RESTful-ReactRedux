import * as types from "./actionTypes";

export function ApiCall() {
  return { type: types.API_CALL };
}

export function apiCallErr() {
  return { type: types.API_CALL_ERR };
}
