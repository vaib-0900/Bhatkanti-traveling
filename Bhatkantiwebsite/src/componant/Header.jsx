import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top py-1 d-block bg-white bhk-header"
        data-navbar-on-scroll="data-navbar-on-scroll"
      >
        <div className="container">
          <NavLink to="/"
                  end 
                  className={({ isActive }) =>
                    'nav-link fw-medium' + (isActive ? ' active' : '')}>
            <img src="assets\img\bhatkanti.png" height={150} alt="logo" />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"> </span>
          </button>

          <div
            className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto pt-2 pt-lg-0 font-base align-items-lg-center align-items-start">
              <li className="nav-item px-3 px-xl-4">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    'nav-link fw-medium' + (isActive ? ' active' : '')
                  }
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item px-3 px-xl-4">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    'nav-link fw-medium' + (isActive ? ' active' : '')
                  }
                >
                  About Us
                </NavLink>
              </li>

              <li className="nav-item px-3 px-xl-4">
                <NavLink
                  to="/tour-packages"
                  className={({ isActive }) =>
                    'nav-link fw-medium' + (isActive ? ' active' : '')
                  }
                >
                  Tour packages
                </NavLink>
              </li>
              <li className="nav-item px-3 px-xl-4">
                <NavLink
                  to="/destination"
                  className={({ isActive }) =>
                    'nav-link fw-medium' + (isActive ? ' active' : '')
                  }
                >
                  Destination
                </NavLink>
              </li>
              <li className="nav-item px-3 px-xl-4">
                <NavLink
                  to="/booking"
                  className={({ isActive }) =>
                    'nav-link fw-medium' + (isActive ? ' active' : '')
                  }
                >
                  Booking
                </NavLink>
              </li>

              <li className="nav-item px-3 px-xl-4">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    'nav-link fw-medium' + (isActive ? ' active' : '')
                  }
                >
                  contact
                </NavLink>
              </li>
 {/* ===================== Page Banner =====================
              <li className="nav-item px-3 px-xl-4">
                <Link className="nav-link fw-medium" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item px-3 px-xl-4">
                <Link
                  className="btn btn-outline-dark order-1 order-lg-0 fw-medium"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
 */}
              <li className="nav-item dropdown px-3 px-lg-0">
                <a
                  className="d-inline-block ps-0 py-2 pe-3 text-decoration-none dropdown-toggle fw-medium"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  EN
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end border-0 shadow-lg"
                  style={{ borderRadius: '0.3rem' }}
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#!">
                      EN
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      BN
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style>{`
        .bhk-header {
          background-color: #ffffff !important;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
      `}</style>
    </div>
  )
}

export default Header
