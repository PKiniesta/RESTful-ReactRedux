import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ onChange, placeholder }) => (
  <>
    <input
      name="searchAuthor"
      className="form-control mb-2 mt-2 w-100"
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      aria-label="Search"
    />
  </>
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default SearchBar;
