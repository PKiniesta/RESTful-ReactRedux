import React from "react";
import "../home.css";
import Input from "../../common/Input";
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
            <form onSubmit={onSave}>
              <div className="form-group login">
                <Input
                  name="login"
                  placeholder="Your email"
                  value={user.login}
                  onChange={onChange}
                  error={errors.login}
                />
              </div>
              <div className="form-group">
                <Input
                  name="password"
                  placeholder="Your password"
                  value={user.password}
                  onChange={onChange}
                  type="password"
                  error={errors.password}
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btnSubmit w-100"
                  disabled={loading}
                >
                  Sign in
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
