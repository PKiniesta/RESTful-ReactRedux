import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item ml-2 mr-2">
            <NavLink exact to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item ml-2 mr-2">
            <NavLink to="/courses" className="nav-link">
              Courses
            </NavLink>
          </li>
          <li className="nav-item ml-2 mr-2">
            <a className="nav-link disabled" href="/pric" aria-disabled="true">
              Pricinge
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#" aria-disabled="true">
              Disabled
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
