import React from "react";
import "../../styles/formStyle.css";

const HomeForm = () => {
  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your Email *"
                value=""
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Your Password *"
                value=""
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeForm;
