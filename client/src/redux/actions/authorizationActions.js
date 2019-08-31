import axios from "axios";
import setAuthorizationToken from "../../utils/setAuthorizationToken";
import jwt from "jsonwebtoken";
import * as types from "../actions/actionTypes";

export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function login(data) {
  return dispatch => {
    return axios.post("http://localhost:5000/login", data).then(res => {
      const token = res.data.token;
      console.log(res.data.token);
      localStorage.setItem("jwtToken", token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      console.log(jwt.decode(token));
    });
  };
}
