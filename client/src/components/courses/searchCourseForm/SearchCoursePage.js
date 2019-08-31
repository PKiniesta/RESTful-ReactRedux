import React from "react";
import PropTypes from "prop-types";
import SearchCourseForm from "./SearchCourseForm";

const SearchCoursePage = ({ filterText, updateFilter }) => {
  function onChange(event) {
    const { value } = event.target;
    updateFilter(value);
    console.log(value);
  }
  return <SearchCourseForm filter={filterText} onChange={onChange} />;
};

SearchCoursePage.propTypes = {
  filterText: PropTypes.string.isRequired,
  updateFilter: PropTypes.func.isRequired
};

export default SearchCoursePage;
