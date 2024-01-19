import React from "react";
import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authcontext";
import { useCart } from "../../Context/cartcontext";
import carticon from '../../cart.png'
const Header = () => {
  const [cart, setcart] = useCart();
  const [auth, setauth] = useAuth();
  const navigate = useNavigate();
  const handlelogout = () => {
    setauth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary py-3">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse fw-bold"
            id="navbarTogglerDemo01"
          >
            <NavLink
              to="/"
              style={{ textDecoration: "none", color: "black" }}
              class="brand-name"
            >
              STEPSTYLE
            </NavLink>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <NavLink
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    margin: "10px",
                  }}
                  class="nav-link active "
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li class="nav-item"></li>
              {!auth.user ? (
                <>
                  <li class="nav-item fw-bold ">
                    <NavLink
                      to="/register"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        margin: "10px",
                      }}
                      class="nav-link"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li class="nav-item fw-bold">
                    <NavLink
                      to="/login"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        margin: "12px",
                      }}
                      class="nav-link"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li class="nav-item fw-bold">
                  <NavLink
                    onClick={handlelogout}
                    to='/'
                    style={{
                      textDecoration: "none",
                      color: "black",
                      margin: "12px",
                      cursor: "pointer",
                    }}
                    class="nav-link"
                  >
                    Logout
                  </NavLink>
                </li>
              )}
              <li class="nav-item">
                <NavLink
                  to="/dashboard/user/details"
                  style={{
                    textDecoration:'none',
                    color: "black",
                    margin: "10px",
                    textTransform:'capitalize'
                  }}
                  class="nav-link active "
                  aria-current="page"
                >
                 {auth?.user?.name}
                </NavLink>
              </li>

              <li class="nav-item fw-bold">
                <NavLink
                  to="/cart"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    margin: "12px",
                  }}
                  class="nav-link"
                >
                  <img src={carticon} className="cart-img"/> <sup> {cart?.length}</sup>
                </NavLink>
              </li>
            </ul>
            {/* <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
