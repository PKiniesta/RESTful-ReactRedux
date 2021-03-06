import * as types from "./actionTypes";
import * as courseCall from "../../apiReq/courseCall";
import { ApiCall, apiCallErr } from "./apiStatusActions";

export function loadCourseOK(courses) {
  return {
    type: types.LOAD_COURSES_OK,
    courses
  };
}

export function createCourseOK(course) {
  return {
    type: types.CREATE_COURSE_OK,
    course
  };
}

export function updateCourseOK(course) {
  return {
    type: types.UPDATE_COURSE_OK,
    course
  };
}

export function deleteCourseNoWaitingApi(course) {
  return { type: types.DELETE_COURSE_NO_API_WAITING, course };
}

export function loadCourses() {
  return function(dispatch) {
    dispatch(ApiCall());
    return courseCall
      .getCourses()
      .then(courses => {
        dispatch(loadCourseOK(courses));
      })
      .catch(error => {
        dispatch(apiCallErr(error));
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function(dispatch) {
    dispatch(ApiCall());
    return courseCall
      .saveCourse(course)
      .then(savedCourse => {
        course._id
          ? dispatch(updateCourseOK(savedCourse))
          : dispatch(createCourseOK(savedCourse));
      })
      .catch(error => {
        dispatch(apiCallErr(error));
        throw error;
      });
  };
}

export function deleteCourse(course) {
  return function(dispatch) {
    dispatch(deleteCourseNoWaitingApi(course));
    return courseCall.deleteCourse(course._id);
  };
}
