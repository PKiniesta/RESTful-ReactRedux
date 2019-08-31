import React from "react";
import "../home.css";
import TextInput from "../../common/TextInput";
import PropTypes from "prop-types";

const HomePage = ({
  isAuthenticated,
  errors,
  loading,
  onChange,
  onSave,
  user
}) => {
  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        {isAuthenticated ? (
          <h3 className="col-md-6 login-form-1 text-center">Logged</h3>
        ) : (
          <div className="col-md-6 login-form-1">
            <div></div>
            {errors.network && (
              <div className="alert alert-danger">{errors.network}</div>
            )}
            <h3>Login</h3>
            <button onClick={() => console.log(errors)}>123</button>
            <form onSubmit={onSave}>
              <div className="form-group">
                <TextInput
                  name="login"
                  placeholder="Your email"
                  value={user.login}
                  onChange={onChange}
                  error={errors.login}
                />
              </div>
              <div className="form-group">
                <TextInput
                  name="password"
                  placeholder="Your password"
                  value={user.password}
                  onChange={onChange}
                  type="password"
                  error={errors.password}
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btnSubmit" disabled={loading}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default HomePage;
