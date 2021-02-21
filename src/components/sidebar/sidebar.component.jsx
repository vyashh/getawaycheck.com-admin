import "./sidebar.styles.scss";

import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SideBar extends Component {
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-white sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item text-dark">
                    <Link to="/">
                      <span
                        className={
                          this.props.activeNav === "0"
                            ? "font-weight-bold border-bottom border-secondary text-dark nav-link"
                            : "nav-link text-dark"
                        }
                      >
                        Dashboard
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item text-dark">
                    <Link to="/articles">
                      <span
                        className={
                          this.props.activeNav === "1"
                            ? "font-weight-bold border-bottom border-secondary nav-link text-dark"
                            : "nav-link text-dark"
                        }
                      >
                        Articles
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            <main
              role="main"
              className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 "
            >
              {this.props.children}
            </main>
          </div>
        </div>
      </>
    );
  }
}
