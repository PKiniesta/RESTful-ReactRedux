import React from "react";
import PropTypes from "prop-types";

function List({
  authors,
  courses,
  nameDivide,
  onDeleteClick,
  setRedirectAuthor,
  setRedirectCoursesList,
  filterText,
  onChangeAuthorPerPage
}) {
  return (
    <div className="mt-2">
      <button
        type="button"
        className="btn btn-secondary w-25"
        onClick={() => setRedirectAuthor(true)}
      >
        Add Author
      </button>
      <button
        type="button"
        className="btn btn-secondary w-25 ml-2 "
        onClick={() => setRedirectCoursesList(true)}
      >
        Back
      </button>
      <label className="">
        <h5 className="text-dark">Authors per page</h5>
        <select
          onChange={onChangeAuthorPerPage}
          className="form-control ml-1"
          id="123"
        >
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
      <table className="table mt-2">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {authors
            .filter(author => {
              return (
                author.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
              );
            })
            .map(authors => {
              return (
                <tr key={authors._id} id="tr-hover">
                  <td>{nameDivide(authors.name)[0]}</td>
                  <td>{nameDivide(authors.name)[1]}</td>
                  <td>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => onDeleteClick(authors, courses)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

List.propTypes = {
  authors: PropTypes.array.isRequired,
  nameDivide: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  setRedirectAuthor: PropTypes.func.isRequired,
  setRedirectCoursesList: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired,
  onChangeAuthorPerPage: PropTypes.func.isRequired
};

export default List;
