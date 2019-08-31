import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import PropTypes from "prop-types";

const ProtectedRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <>
      {NotificationManager.error("You must be logged in to see that page")}
      <Redirect to="/" />
    </>
  );
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authorization.isAuthenticated
  };
}

export default connect(mapStateToProps)(ProtectedRoute);
