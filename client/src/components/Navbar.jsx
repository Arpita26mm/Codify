import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const { isLoggedIn, LogoutUser } = useAuth();
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <a href="/">CODIFY</a>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>

              <li>
                <NavLink to="/contact">feedback</NavLink>
              </li>
              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout" onClick={LogoutUser}>
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
