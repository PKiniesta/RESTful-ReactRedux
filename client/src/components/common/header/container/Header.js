import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../../redux/actions/authorizationActions";
import Nav from "../presentational/Nav";
import "../headerStyle.css";
import PropTypes from "prop-types";

const Header = ({ authorization, logout }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState();
  const logoutClick = async () => {
    await window.location.reload();
    logout();
  };

  useEffect(() => {
    setIsAuth(authorization.isAuthenticated);
    setUsername(authorization.user.login);
  }, [authorization]);
  const userRoutes = (
    <>
      <button onClick={() => console.log(authorization)}></button>
      <li className="nav-item ml-2 mr-2 userName">
        <a className="nav-link text-primary">{username}</a>
      </li>
      <li className="nav-item ml-2 mr-2 logout">
        <a onClick={() => logoutClick()} className="nav-link ">
          Logout
        </a>
      </li>
      <li className="nav-item ml-2 mr-2">
        <NavLink to="/courses" className="nav-link">
          Courses
        </NavLink>
      </li>
      <li className="nav-item ml-2 mr-2">
        <NavLink to="/authors" className="nav-link">
          Authors
        </NavLink>
      </li>
    </>
  );

  const questRoutes = (
    <>
      <li className="nav-item ml-2 mr-2">
        <NavLink exact to="/" className="nav-link">
          Sign in
        </NavLink>
      </li>
      <li className="nav-item ml-2 mr-2">
        <NavLink to="/courses" className="nav-link">
          Courses
        </NavLink>
      </li>
    </>
  );
  return (
    <Nav isAuth={isAuth} userRoutes={userRoutes} questRoutes={questRoutes} />
  );
};

Header.propTypes = {
  authorization: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    authorization: state.authorization
  };
}
export default connect(
  mapStateToProps,
  { logout }
)(Header);
