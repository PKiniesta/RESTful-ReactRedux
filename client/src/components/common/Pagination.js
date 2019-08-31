import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ coursesPerPage, totalCourses, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="w-100 ">
      <ul className="pagination justify-content-center">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#" className="page-link text-dark">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  coursesPerPage: PropTypes.number.isRequired,
  totalCourses: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};

export default Pagination;
