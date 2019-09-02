import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../../redux/actions/courseActions";
import * as authorActions from "../../../redux/actions/authorActions";
import * as sortedActions from "../../../redux/actions/sortedActions";
import PropTypes from "prop-types";
import List from "../presentational/List";
import SearchBar from "../../common/SearchBar";
import { Redirect } from "react-router-dom";
import sortedCourses from "../../../redux/reselect/sortedCourses";
import Pagination from "../../common/Pagination";
import Select from "../../common/Select";
import { NotificationManager } from "react-notifications";
import { css } from "@emotion/core";
import { BarLoader } from "react-spinners";

export function Courses({
  courses,
  loadCourses,
  authors,
  loadAuthors,
  sortedCategory,
  sortedAuthors,
  sortedCourses,
  setSortedCourses,
  setSortedCoursesByAuthors,
  setSortedCoursesCategory,
  deleteCourse,
  numberss,
  loading,
  isAuthenticated
}) {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);
  const [redirectToAuthorsPage, setRedirectToAuthorsPage] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(10);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading failed" + error);
      });
      if (authors.length === 0) {
        loadAuthors().catch(error => {
          alert("Loading authors failed" + error);
        });
      }
    }
  }, []);

  const onChangeSelectCourses = () => {
    const { value } = event.target;
    setCoursesPerPage(parseInt(value, 10));
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const onChangeSearchBar = event => {
    const { value } = event.target;
    setFilterText(value);
  };

  const onClickSort = () => {
    setSortedCourses();
  };

  const onCLickSortAuthors = () => {
    setSortedCoursesByAuthors();
  };

  const onClickSortCategory = () => {
    setSortedCoursesCategory();
  };

  const onClickRedirectToAuthors = () => setRedirectToAuthorsPage(true);

  const override = css`
    width: 250px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25vh;
  `;

  const onClickRedirectToAddCourse = () => setRedirectToAddCoursePage(true);
  const OnClickDeleteCourse = async course => {
    try {
      await deleteCourse(course);
      NotificationManager.success("Course Deleted");

      console.log(course);
    } catch (error) {
      NotificationManager.error("DELETE FAILED " + error.message);
    }
  };

  return (
    <div className="container">
      {redirectToAddCoursePage && <Redirect to="/course" />}
      {redirectToAuthorsPage && <Redirect to="/authors" />}
      <h2 className="text-center mt-2">
        Courses in database <span className="text-primary">{numberss}</span>
      </h2>
      {loading ? (
        <BarLoader sizeUnit={"px"} css={override} loading={loading} />
      ) : (
        <>
          <SearchBar
            onChange={onChangeSearchBar}
            placeholder="Search by title"
          />
          <List
            onClickSortCategory={onClickSortCategory}
            sortedAuthors={sortedAuthors}
            sortedCourses={sortedCourses}
            sortedCategory={sortedCategory}
            onClickSortAuthors={onCLickSortAuthors}
            onClickSort={onClickSort}
            onDeleteClick={OnClickDeleteCourse}
            courses={currentCourses}
            RedirectToAddCourse={onClickRedirectToAddCourse}
            RedirectToAuthors={onClickRedirectToAuthors}
            filterText={filterText}
            SelectInput={Select}
            onChangeCoursesPerPage={onChangeSelectCourses}
            isAuthenticated={isAuthenticated}
          />
          <Pagination
            coursesPerPage={coursesPerPage}
            totalCourses={numberss}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}

Courses.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  numberss: PropTypes.number.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  setSortedCourses: PropTypes.func.isRequired,
  setSortedCoursesByAuthors: PropTypes.func.isRequired,
  setSortedCoursesCategory: PropTypes.func.isRequired,
  sortedAuthors: PropTypes.bool.isRequired,
  sortedCourses: PropTypes.bool.isRequired,
  sortedCategory: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authorization.isAuthenticated,
    courses: state.authors.length === 0 ? [] : sortedCourses(state),
    authors: state.authors,
    loading: state.apiCalls > 0,
    sortedCourses: state.sorted[0].sortedCourses,
    sortedAuthors: state.sorted[0].sortedAuthors,
    sortedCategory: state.sorted[0].sortedCategory,
    numberss: state.courses.length > 0 ? state.courses.length : 0
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  deleteCourse: courseActions.deleteCourse,
  setSortedCourses: sortedActions.setSortedCourses,
  setSortedCoursesByAuthors: sortedActions.setSortedCoursesByAuthor,
  setSortedCoursesCategory: sortedActions.setSortedCoursesCategory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);
