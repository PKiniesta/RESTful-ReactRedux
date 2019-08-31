import React, { useState, useEffect } from "react";
import Form from "../presentational/Form";
import { connect } from "react-redux";
import * as authorActions from "../../../../redux/actions/authorActions";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { NotificationManager } from "react-notifications";

export function ManageAuthor({
  authors,
  loadAuthors,
  createAuthor,
  history,
  ...props
}) {
  const [author, setAuthor] = useState({ ...props.author });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [back, setBack] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors();
    }
  }, []);

  function formIsValid() {
    const { name } = author;
    const errors = {};
    if (!name) errors.name = "Name is required";
    else if (name.length < 3) errors.name = "Name is too short";
    else if (
      name.length >= 3 &&
      authors.find(author => author.name.toLowerCase() === name.toLowerCase())
    )
      errors.name = "Author exist";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function onClickSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    createAuthor(author)
      .then(() => {
        history.push("/authors");
        NotificationManager.success("Author added!");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function onChange(event) {
    const { name, value } = event.target;
    setAuthor(prevAuthor => ({
      ...prevAuthor,
      [name]: value
    }));
  }

  return (
    <div className="container mb-5">
      {back && <Redirect to="/authors" />}
      <Form
        authors={authors}
        author={author}
        errors={errors}
        onSave={onClickSave}
        onChange={onChange}
        saving={saving}
        setBack={setBack}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    authors: state.authors
  };
}

ManageAuthor.propTypes = {
  author: PropTypes.object,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  createAuthor: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  loadAuthors: authorActions.loadAuthors,
  createAuthor: authorActions.createAuthor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAuthor);
