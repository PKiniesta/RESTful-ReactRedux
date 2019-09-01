import React from "react";
import PropTypes from "prop-types";
import Input from "../../../common/Input";

const Form = ({ author, onChange, onSave, setBack, errors = {}, saving }) => {
  return (
    <div className="row justify-content-center">
      <form className="col-md-6" onSubmit={onSave}>
        <h2 className="text-center">Add Author</h2>

        {errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {errors.onSave}
          </div>
        )}
        <Input
          type="text"
          name="name"
          label="Name"
          value={author.name}
          onChange={onChange}
          error={errors.name}
        />

        <button type="submit" disabled={saving} className="btn btn-secondary">
          {saving ? "Adding..." : "Add"}
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
  author: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  setBack: PropTypes.func.isRequired
};

export default Form;
