import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCalls from "./apiStatusReducer";
import sorted from "./sortedReducer";
import authorization from "./authorizationReducer";

const rootReducer = combineReducers({
  sorted,
  courses,
  apiCalls,
  authors,
  authorization
});

export default rootReducer;
