import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../../redux/actions/courseActions";
import * as authorActions from "../../../redux/actions/authorActions";
import PropTypes from "prop-types";
import Form from "../presentational/Form";
import { css } from "@emotion/core";
import { BarLoader } from "react-spinners";
import { NotificationManager } from "react-notifications";

export function ManageCourse({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  loading,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const override = css`
    width: 250px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25vh;
  `;

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
    } else {
      setCourse(props.course);
    }
  }, [props.course]);

  function onChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? value : value
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) {
      errors.title = "Title is required";
    } else if (title.length < 3) errors.title = "Title is too short";
    else if (
      title.length >= 3 &&
      courses.find(course => course.title.toLowerCase() === title.toLowerCase())
    ) {
      errors.title = "Course exist";
    }
    if (!authorId) errors.author = "Author is required";
    if (!category) {
      errors.category = "Category is required";
    } else if (category.length < 2)
      errors.category = "Category name is too short";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function onClickSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    history.push("/courses");
    saveCourse(course)
      .then(() => {
        NotificationManager.success("Course saved.");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }
  return (
    <div className="container mb-5">
      {loading ? (
        <BarLoader sizeUnit={"px"} css={override} loading={loading} />
      ) : (
        <>
          <Form
            course={course}
            errors={errors}
            authors={authors}
            onChange={onChange}
            onSave={onClickSave}
            saving={saving}
          />
        </>
      )}
    </div>
  );
}

ManageCourse.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : {};
  return {
    course,
    courses: state.courses,
    authors: state.authors,
    loading: state.apiCalls > 0
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCourse);
