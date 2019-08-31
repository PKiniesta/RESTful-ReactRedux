import * as types from "../actions/actionTypes.js";
import initialState from "./initialState";

export default function sortedReducer(state = initialState.sorted, action) {
  switch (action.type) {
    case types.SET_SORTED_COURSES:
      return state.map(({ sortedCourses }) => ({
        sortedCourses: !sortedCourses,
        sortedAuthors: false,
        sortedCategory: false
      }));
    case types.SET_SORTED_COURSES_BY_AUTHOR:
      return state.map(({ sortedAuthors }) => ({
        sortedCourses: false,
        sortedAuthors: !sortedAuthors,
        sortedCategory: false
      }));

    case types.SET_SORTED_COURSES_CATEGORY:
      return state.map(({ sortedCategory }) => ({
        sortedCourses: false,
        sortedAuthors: false,
        sortedCategory: !sortedCategory
      }));

    default:
      return state;
  }
}
