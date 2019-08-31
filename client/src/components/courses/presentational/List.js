import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const List = ({
  courses,
  onDeleteClick,
  RedirectToAddCourse,
  RedirectToAuthors,
  filterText,
  onClickSort,
  sortedCourses,
  sortedAuthors,
  onClickSortAuthors,
  onClickSortCategory,
  sortedCategory,
  onChangeCoursesPerPage
}) => {
  return (
    <>
      <button
        type="button"
        disabled={!courses.length}
        className="btn btn-secondary w-25 mb-1 mt-1 add-course"
        onClick={RedirectToAddCourse}
      >
        Add Course
      </button>
      <button
        type="button"
        className="btn btn-secondary w-25  ml-1 mb-1 mt-1 authors-redirect"
        onClick={RedirectToAuthors}
      >
        Authors
      </button>

      <div>
        <h4 className="text-center text-dark mt-4 ">Sort options</h4>
        <button
          type="button"
          disabled={!courses.length}
          className="btn btn-secondary w-25  mb-1  sort-title"
          onClick={onClickSort}
        >
          {sortedCourses ? "Unsort" : "Sort by title"}
        </button>
        <button
          className="btn btn-secondary w-25  mb-1 ml-1"
          disabled={!courses.length}
          onClick={onClickSortAuthors}
        >
          {sortedAuthors ? "Unsort" : "Sort by author"}
        </button>
        <button
          className="btn btn-secondary w-25 mb-1 ml-1"
          disabled={!courses.length}
          onClick={onClickSortCategory}
        >
          {sortedCategory ? "Unsort" : "Sort by category"}
        </button>
        <label className="">
          <h5 className="text-dark">Courses per page</h5>
          <select
            onChange={onChangeCoursesPerPage}
            className="form-control ml-1"
            id="123"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </label>
      </div>
      <table className="table mt-2">
        <thead className="thead-light">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-danger">
                <h2>No Courses!!</h2>
              </td>
            </tr>
          ) : (
            courses
              .filter(course => {
                //add filter
                return (
                  course.title
                    .toLowerCase()
                    .indexOf(filterText.toLowerCase()) >= 0
                );
              })
              .map(course => {
                return (
                  <tr key={course._id} id="tr-hover">
                    <td>
                      <Link to={"/course/" + course.slug}>{course.title}</Link>
                    </td>
                    <td>{course.authorName}</td>
                    <td>{course.category}</td>
                    <td>
                      <a className="btn btn-dark" href="#">
                        Watch
                      </a>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => onDeleteClick(course)}
                      />
                      Delete
                    </td>
                  </tr>
                );
              })
          )}
        </tbody>
      </table>
    </>
  );
};

List.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  RedirectToAuthors: PropTypes.func.isRequired,
  RedirectToAddCourse: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired,
  onClickSort: PropTypes.func.isRequired,
  sortedCourses: PropTypes.bool.isRequired,
  sortedAuthors: PropTypes.bool.isRequired,
  onClickSortAuthors: PropTypes.func.isRequired,
  onClickSortCategory: PropTypes.func.isRequired,
  sortedCategory: PropTypes.bool.isRequired,
  onChangeCoursesPerPage: PropTypes.func.isRequired
};

export default List;
