import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInput from "../../common/TextInput";
import SelectInput from "../../common/SelectInput";
import { Redirect } from "react-router-dom";

const Form = ({
  course,
  authors,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  const [back, setBack] = useState(false);

  return (
    <div className="row justify-content-center">
      {back && <Redirect to="/courses" />}
      <form className="col-md-6" onSubmit={onSave}>
        <h2 className="text-center">{course._id ? "Edit" : "Add"} Course</h2>
        {errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {errors.onSave}
          </div>
        )}
        <TextInput
          type="text"
          name="title"
          label="Title"
          value={course.title}
          onChange={onChange}
          error={errors.title}
        />

        <SelectInput
          name="authorId"
          label="Author"
          value={course.authorId || ""}
          defaultOption="Select Author"
          options={authors.map(author => ({
            value: author._id,
            text: author.name
          }))}
          onChange={onChange}
          error={errors.author}
        />

        <TextInput
          type="text"
          name="category"
          label="Category"
          value={course.category}
          onChange={onChange}
          error={errors.category}
        />

        <button type="submit" disabled={saving} className="btn btn-secondary">
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-3"
          onClick={() => setBack(true)}
        >
          Back
        </button>
      </form>
    </div>
  );
};

Form.propTypes = {
  authors: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default Form;
