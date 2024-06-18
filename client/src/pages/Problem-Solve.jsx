import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { useAuth } from "../store/auth";
import styles from "./ProblemSolve.module.css";
import "../styles/ProblemSolve.css";

export const ProblemSolve = () => {
  const params = useParams();
  const { authorizationToken } = useAuth();

  //const { id } = useParams();
  const [problem, setProblem] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("//Write Your Code Here");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState("");

  const getSingleProblemData1 = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/problems/${params.id}`,
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
    getSingleProblemData1();
  }, [params.id]);

  const handleRun = async () => {
    const payload = {
      language,
      code,
      input,
    };

    const headers = {
      Authorization: authorizationToken,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/problems/run/${params.id}`,
        payload,
        { headers }
      );
      console.log(data);
      setOutput(data.output1);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };
    const headers = {
      Authorization: authorizationToken,
    };
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/problems/submit/${params.id}`,
        payload,
        { headers }
      );
      console.log(data);
      setVerdict(data.verdict);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="problem-solve-container {styles.problemSolve} content-container">
      <div className="lhs-container">
        <div>
          <h2 className="text-3xl font-semibold lg:pl-8 pt-10">
            {problem.title}
          </h2>
        </div>
        <div className="lg:pl-8 pt-10 pr-12">
          <div className="bg-gray-100 rounded-sm shadow-md p-4 h-3/4 overflow-y-auto lg:pl-8 pt-10">
            <h2 className="text-2xl font-semibold mb-2 text-black">
              Problem Description
            </h2>
            <div className="font-mono text-2xl text-black">
              {problem.description}
            </div>
          </div>

          <div className="lg:w-1/1  pt-10">
            {/* Input textarea */}
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Input</h2>
              <textarea
                rows="3"
                cols="20"
                value={input}
                placeholder="Input"
                onChange={(e) => setInput(e.target.value)}
                className="border border-gray-300 rounded-sm py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 resize-none w-full"
                style={{ minHeight: "100px", overflowY: "auto" }}
              ></textarea>
            </div>
            {
              <div
                className="bg-gray-100 rounded-sm shadow-md p-4 h-64 " //
                style={{
                  overflowY: "auto",
                  color: "black",
                }}
              >
                <h2 className="text-2xl font-semibold mb-2">Output</h2>
                <div
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                    color: "black",
                  }}
                >
                  {output}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <div className="rhs-container">
        <div className="lg:pl-8 pt-10 pr-12">
          <div className="language-selector">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option className="text-2xl" value="cpp">
                cpp
              </option>
              <option className="text-2xl" value="py">
                python
              </option>
            </select>
          </div>
          <div className="lg:w-1/1 lg:pr-4 mb-4 lg:mb-0 lg:pl-8 pt-10 pr-12  ">
            <div
              className="bg-gray-100 shadow-md w-full text-black " //max-w-lg removed
              style={{ height: "450px", overflowY: "auto" }}
            >
              <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) => highlight(code, languages.js)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  outline: "none",
                  border: "none",
                  color: "black",
                  backgroundColor: "#f7fafc",
                  //height: "100%",
                  minHeight: "450px",
                  overflowY: "auto",
                }}
              />
            </div>
          </div>
          <div className="button-container lg:pl-8 pt-10 pr-6 mb-10">
            <button onClick={handleRun} type="button" className="run-button">
              Run
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className="submit-button"
            >
              Submit
            </button>
          </div>

          {
            <div
              className="bg-gray-100 rounded-sm shadow-md p-4 h-36  "
              style={{
                overflowY: "auto",
                color: "black",
              }}
            >
              <h2 className="text-2xl font-semibold mb-2">Verdict</h2>
              <div
                style={{
                  color: "black",
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                }}
              >
                {verdict}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
