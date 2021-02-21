import React, { useState } from "react";
import "./navbar.styles.scss";
import { useAuth } from "../../providers/AuthProvider";
import { useHistory } from "react-router-dom";

export default function NavBar() {
  const { logout } = useAuth();

  return (
    <>
      <nav className="navbar navbar-light sticky-top bg-white flex-md-nowrap p-0 border-bottom">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0 font-weight-bold text-dark"
          href="/"
        >
          GetAwayCheck Admin Panel
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link text-dark btn-logout" onClick={logout}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
