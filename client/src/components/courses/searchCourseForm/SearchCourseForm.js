import React from "react";
import PropTypes from "prop-types";

const SearchCourseForm = ({ onChange }) => (
  <>
    <button className="btn btn-primary w-25">Sort by title</button>
    <button className="btn btn-primary ml-1 w-25">Sort by Author</button>
    <input
      name="searchAuthor"
      className="form-control mb-2 mt-2 w-100"
      type="text"
      placeholder="Search by a title"
      onChange={onChange}
      aria-label="Search"
    />
  </>
);

SearchCourseForm.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default SearchCourseForm;
