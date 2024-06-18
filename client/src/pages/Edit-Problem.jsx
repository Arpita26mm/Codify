import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

export const EditProblem = () => {
  const [problem, setProblem] = useState(null); //problem = initialised as an empty object
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

  const params = useParams();

  console.log("params single problem:", params);
  const { authorizationToken } = useAuth();

  const getSingleProblemData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/probs/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();
      console.log(`problems single data : ${data}`);
      if (data) {
        setProblem(data);
        setTitle(data.title);
        setDescription(data.description);
        setTestCases(
          data.testCases.length > 0
            ? data.testCases
            : [{ input: "", output: "" }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProblemData();
  }, [params.id]);

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
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/probs/update-prob/${
          params.id
        }`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken, //for authorisation
          },
          body: JSON.stringify({
            title,
            description,
            testCases,
          }),
        }
      );
      if (response.ok) {
        toast.success("updated Successfully");
      } else {
        toast.error("Not Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content-container2">
      <h1>Edit Problem</h1>
      <form onSubmit={handleSubmit} className="form2">
        <div className="form-group2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="input-field"
          />
        </div>
        <div className="form-group2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="textarea-field"
          ></textarea>
        </div>
        <div className="form-group2">
          <label htmlFor="testcase">Test Cases</label>
          {testCases.map((testCase, index) => (
            <div key={index} className="testcase-group">
              <div className="grid grid-two-cols">
                <textarea
                  value={testCase.input}
                  onChange={(e) =>
                    handleTestCaseChange(index, "input", e.target.value)
                  }
                  placeholder="Input"
                  required
                  className="textarea-field"
                ></textarea>
                <textarea
                  value={testCase.output}
                  onChange={(e) =>
                    handleTestCaseChange(index, "output", e.target.value)
                  }
                  placeholder="Output"
                  required
                  className="textarea-field"
                ></textarea>
              </div>
            </div>
          ))}
        </div>
        <div className="form-group2">
          <button type="submit" className="submit-button2">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
