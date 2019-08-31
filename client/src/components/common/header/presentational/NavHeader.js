import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavHeader = ({ isAuth, userRoutes, questRoutes, authorization }) => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav">
          {isAuth ? userRoutes : questRoutes}
          <button onClick={() => console.log(authorization)}></button>
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
          <li className="nav-item ml-2 mr-2">
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

NavHeader.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  userRoutes: PropTypes.object.isRequired,
  questRoutes: PropTypes.object.isRequired,
  authorization: PropTypes.object.isRequired
};
export default NavHeader;
