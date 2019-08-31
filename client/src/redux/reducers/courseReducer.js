import * as types from "../actions/actionTypes";
import initialState from "./initialState";
export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE_OK:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_OK:
      return state.map(course =>
        course._id === action.course._id ? action.course : course
      );
    case types.LOAD_COURSES_OK:
      return action.courses;

    case types.DELETE_COURSE_NO_API_WAITING:
      return state.filter(course => course._id !== action.course._id);
    default:
      return state;
  }
}
