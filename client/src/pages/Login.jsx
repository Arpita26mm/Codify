import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("login formheheheheeheheehehehehe", response);
      const res_data = await response.json();
      console.log("hkmjnijhad", res_data);

      if (response.ok) {
        storeTokenInLS(res_data.token);

        setUser({
          email: "",
          password: "",
        });
        toast.success("Login Successful");
        if (res_data.isAdmin) {
          navigate("/admin/users");
        } else {
          navigate("/problem-list");
        }
      } else {
        toast.error(
          res_data.extradetails ? res_data.extradetails : res_data.message
        );
        console.log("invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <>
      <section className="content-container">
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/pic4.png"
                  alt="Let's fill the Login form"
                  width="500"
                  height="500"
                />
              </div>

              {/*lets tackle registration form*/}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
