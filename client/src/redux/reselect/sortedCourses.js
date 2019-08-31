import { createSelector } from "reselect";

const courses = state =>
  state.courses.map(course => {
    return {
      ...course,
      authorName: state.authors.find(a => a._id === course.authorId).name
    };
  });
const sortedCourses = state => state.sorted[0].sortedCourses;
const sortedAuthors = state => state.sorted[0].sortedAuthors;
const sortedCategory = state => state.sorted[0].sortedCategory;

const showCourses = (courses, sortedCourses, sortedAuthors) => {
  if (sortedCourses) {
    return [...courses].sort((a, b) => {
      const a1 = a.title.toLowerCase();
      const b1 = b.title.toLowerCase();
      return a1 < b1 ? -1 : 1;
    });
  } else if (sortedAuthors) {
    return [...courses].sort((a, b) => {
      const a1 = a.authorName.toLowerCase();
      const b1 = b.authorName.toLowerCase();
      return a1 < b1 ? -1 : 1;
    });
  } else if (sortedCategory) {
    return [...courses].sort((a, b) => {
      const a1 = a.category.toLowerCase();
      const b1 = b.category.toLowerCase();
      return a1 < b1 ? -1 : 1;
    });
  }
  return courses;
};

export default createSelector(
  courses,
  sortedCourses,
  sortedAuthors,
  sortedCategory,
  showCourses
);
