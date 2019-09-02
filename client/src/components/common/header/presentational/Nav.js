import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Nav = ({ isAuth, userRoutes, questRoutes }) => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav">
          {isAuth ? userRoutes : questRoutes}
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

Nav.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  userRoutes: PropTypes.object.isRequired,
  questRoutes: PropTypes.object.isRequired
};

export default Nav;
