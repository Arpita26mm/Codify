import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const CreateProblem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  const navigate = useNavigate();

  const { authorizationToken } = useAuth();

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  // to update the data dynamically
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/create-prob/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify({
            title,
            description,
            testCases,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Created Successfully");
        navigate("/admin"); // Redirect to the admin page after successful problem creation
      } else {
        toast.error("Not Created");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container1 ">
      <h1>Create Problem</h1>
      <form onSubmit={handleSubmit} className="form1">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="testcases">Test Cases</label>
          {testCases.map((curTestCase, index) => (
            <div key={index} className="test-case-group">
              <div className="grid grid-two-cols">
                <textarea
                  value={curTestCase.input}
                  onChange={(e) =>
                    handleTestCaseChange(index, "input", e.target.value)
                  }
                  placeholder="Input"
                  required
                  className="form-control"
                ></textarea>
                <textarea
                  value={curTestCase.output}
                  onChange={(e) =>
                    handleTestCaseChange(index, "output", e.target.value)
                  }
                  placeholder="Output"
                  required
                  className="form-control"
                ></textarea>
              </div>
            </div>
          ))}
          <div className="grid grid-two-cols">
            <button
              type="button"
              onClick={handleAddTestCase}
              className="btn1 btn-secondary"
            >
              Add Test Case
            </button>

            <button type="submit" className="btn1 btn-primary">
              Create and Add the Problem in List
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
