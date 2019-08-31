import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import List from "../presentational/List";
import SearchBar from "../../../common/SearchBar";
import * as authorActions from "../../../../redux/actions/authorActions";
import * as coursesActions from "../../../../redux/actions/courseActions";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { Redirect } from "react-router-dom";
import Pagination from "../../../common/Pagination";
import { css } from "@emotion/core";
import { BarLoader } from "react-spinners";

const Authors = ({
  authors,
  loadAuthors,
  deleteAuthor,
  courses,
  loadCourses,
  loading,
  numberss
}) => {
  const [redirectAuthor, setRedirectAuthor] = useState(false);
  const [redirectCoursesList, setRedirectCoursesList] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage, setAuthorsPerPage] = useState(10);

  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  const override = css`
    width: 250px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25vh;
  `;

  const onChangeSelectAuthors = () => {
    const { value } = event.target;
    setAuthorsPerPage(parseInt(value, 10));
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);
  useEffect(() => {
    if (authors.length === 0) {
      //if -- only load data when we have empty array
      loadAuthors().catch(error => {
        alert("fail" + error);
      });
      loadCourses().catch(error => {
        alert("failt" + error);
      });
    }
  }, []); //empty array as second arg , to update only when variables changes

  function nameDivide(a) {
    const authorSplitedName = a.split(" ");
    return authorSplitedName;
  }

  const onChange = event => {
    const { value } = event.target;
    setFilterText(value);
    console.log(filterText);
  };

  const onClickDeleteAuthor = async (author, courses) => {
    // console.log(author.id);
    // courses.map(course => console.log(course.title));
    if (courses.find(course => course.authorId === author._id)) {
      NotificationManager.error("AUTHOR HAVE COURSE OR COURSES!!! CANT DELETE");
    } else {
      try {
        await NotificationManager.success("Author deleted");
        deleteAuthor(author);
      } catch (error) {
        NotificationManager.error("DELETE FAILED " + error.message);
      }
    }
  };

  return (
    <div className="container mb-5">
      {redirectAuthor && <Redirect to="/author" />}
      {redirectCoursesList && <Redirect to="/courses" />}
      <h2 className="text-center">Authors</h2>
      <SearchBar placeholder="Search..." onChange={onChange} />
      {loading ? (
        <BarLoader sizeUnit={"px"} css={override} loading={loading} />
      ) : (
        <>
          <List
            nameDivide={nameDivide}
            onDeleteClick={onClickDeleteAuthor}
            authors={currentAuthors}
            courses={courses}
            setRedirectAuthor={setRedirectAuthor}
            setRedirectCoursesList={setRedirectCoursesList}
            filterText={filterText}
            onChangeAuthorPerPage={onChangeSelectAuthors}
          />
          <Pagination
            coursesPerPage={authorsPerPage}
            totalCourses={numberss}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    authors: state.authors,
    courses: state.courses,
    loading: state.apiCalls > 0,
    numberss: state.authors.length > 0 ? state.authors.length : 0
  };
}

Authors.propTypes = {
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  numberss: PropTypes.number.isRequired
};

const mapDispatchToProps = {
  deleteAuthor: authorActions.deleteAuthor,
  loadAuthors: authorActions.loadAuthors,
  loadCourses: coursesActions.loadCourses
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authors);
