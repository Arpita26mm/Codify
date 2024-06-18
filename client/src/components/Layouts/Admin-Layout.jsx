import { NavLink, Outlet } from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import "./Admin-Layout.css";

export const AdminLayout = () => {
  return (
    <>
      <div>
        <header>
          <div className="container">
            <nav>
              <ul>
                <li>
                  <NavLink to="/admin/users">
                    <FaUser /> users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/contacts">
                    <FaMessage /> feedback
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/create-problem">
                    <button className="btn  btn-submit">Create Problem</button>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/all-problems">
                    <button className="btn  btn-submit">All Problems</button>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
      <Outlet />
    </>
  );
};
