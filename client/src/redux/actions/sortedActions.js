import * as types from "./actionTypes";

export function setSortedCourses() {
  return {
    type: types.SET_SORTED_COURSES
  };
}

export function setSortedCoursesByAuthor() {
  return {
    type: types.SET_SORTED_COURSES_BY_AUTHOR
  };
}

export function setSortedCoursesCategory() {
  return {
    type: types.SET_SORTED_COURSES_CATEGORY
  };
}
