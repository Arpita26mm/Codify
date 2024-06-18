import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllProblems = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/problems/`,
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

      console.log(`problems:`, data);
      setProblems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProblems();
  }, []);

  return (
    <>
      <section className="admin-users-section content-container">
        <div className="container">
          <div className="Adminhead">Problem List</div>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>
                  <h2>S.No</h2>
                </th>
                <th>
                  <h2>Problems Link</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {problems.map((curProblem, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <h2>
                        <Link
                          to={`/problem-list/${curProblem._id}/problem-solve`}
                        >
                          {curProblem.title}
                        </Link>
                      </h2>
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
