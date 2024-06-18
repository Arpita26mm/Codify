import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]); //users is an empty array initially so has index associated with it
  const { authorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log(`users ${data}`); //arr of obj
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  //delete the user on delete button
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken, //for authorisation
          },
        }
      );
      const data = await response.json();
      console.log(`users after delete ${data}`); //arr of obj

      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);
  return (
    <>
      <section className="admin-users-section content-container">
        <div className="container">
          <div className="Adminhead">Admin Users Data</div>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <h2>{curUser.username}</h2>
                    </td>
                    <td>
                      <h2>{curUser.email}</h2>
                    </td>
                    <td>
                      <h2>{curUser.phone}</h2>
                    </td>
                    <td>
                      <h2>
                        <Link to={`/admin/users/${curUser._id}/edit`}>
                          Edit
                        </Link>
                      </h2>
                    </td>
                    <td>
                      <button onClick={() => deleteUser(curUser._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
