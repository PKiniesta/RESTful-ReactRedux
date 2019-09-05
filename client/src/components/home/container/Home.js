import React, { useState } from "react";
import { connect } from "react-redux";
import * as authorizationActions from "../../../redux/actions/authorizationActions";
import Page from "../presentational/Page";
import PropTypes from "prop-types";

const Home = ({ login, isAuthenticated }) => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function isValid() {
    //good pattern for validate form
    const { login, password } = user;
    const errors = {};

    if (!login) {
      errors.login = "Login is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }

    setErrors(errors);
    // console.log(Object.keys(errors).length === 0);
    return Object.keys(errors).length === 0;
  }

  function onClickSign(event) {
    event.preventDefault();
    if (!isValid()) return;
    setLoading(true);
    login(user)
      // eslint-disable-next-line no-unused-vars
      .then(res => {
        setLoading(false);
      })
      .catch(err => {
        if (err.response) {
          setErrors(err.response.data);
          setLoading(false);
          return;
        }

        if (err.toJSON().message) {
          console.log(err.toJSON());
          setErrors({ network: err.toJSON().message });
          setLoading(false);
          return;
        }
        console.log(err);
      });
  }

  function onChange(event) {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }
  return (
    <Page
      isAuthenticated={isAuthenticated}
      errors={errors}
      loading={loading}
      onChange={onChange}
      onClickSign={onClickSign}
      user={user}
    />
  );
};

Home.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authorization.isAuthenticated
  };
}

const mapDispatchToProps = {
  login: authorizationActions.login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
