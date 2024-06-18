import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
//import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AllProblems = () => {
  const [problems, setProblems] = useState([]); //problems is an empty array initially so has index associated with it

  const { authorizationToken } = useAuth();

  const getAllProblemsData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/probs`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch problems");
      }
      const data = await response.json();
      //console.log(`problems ${data}`); //arr of obj
      console.log(`problems:`, data);
      setProblems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProblem = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/probs/delete-prob/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log(`users after delete ${data}`); //arr of obj

      if (response.ok) {
        getAllProblemsData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProblemsData();
  }, []);

  return (
    <section className="admin-problems-section content-container">
      <div className="container">
        <div className="Adminhead">All Problems</div>
      </div>
      <div className="container admin-problems">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((curProblem, index) => (
              <tr key={index}>
                <td>
                  <h2>{curProblem.title}</h2>
                </td>
                <td>
                  <Link
                    to={`/admin/all-problems/${curProblem._id}/edit-problem`}
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button onClick={() => deleteProblem(curProblem._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
