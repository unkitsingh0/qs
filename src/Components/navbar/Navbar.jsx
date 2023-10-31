import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toaster, toast } from "react-hot-toast";
import "./css/navbar.css";
function Navbar() {
  let [cookies, setCookies] = useCookies();
  let navigate = useNavigate();
  let logOut = (e) => {
    setCookies("uid", null);
    setCookies("token", null);
    navigate("/auth");
    return;
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg  ">
        <div className="container-fluid">
          <Link className="navbar-brand brand-name" to="/">
            QuikShort
          </Link>
          {cookies && cookies.uid ? (
            <>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/links">
                      Link
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/qrandtext">
                      Qr-Codes
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/about">
                      About
                    </NavLink>
                  </li>
                </ul>
                <ul className="navbar-nav me-2 mb-2 mb-lg-0">
                  <li className="nav-item dropdown ">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {/* Dropdown */}
                      <FontAwesomeIcon
                        icon="fa-user"
                        className="profile_icon"
                      />
                    </a>
                    <ul className="dropdown-menu ">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          href="#"
                          onClick={(e) => {
                            toast("We are working on it!!!", { icon: "🧑‍🏭" });
                          }}
                        >
                          Buy Pro
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <p className="dropdown-item" onClick={logOut}>
                          Logout
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </>
          ) : null}
        </div>
      </nav>
      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default Navbar;
