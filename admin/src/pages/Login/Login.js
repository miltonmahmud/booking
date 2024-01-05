import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import API from "../../service/API/API";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async () => {
    try {
      dispatch({ type: "LOGIN_START" });

      const res = await API.post("/auth/login", credentials);

      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data });
    }
  };

  return (
    <div className="login">
      <form className="form-control">
        {error && (
          <div className="error">
            <span>{error.message}</span>
          </div>
        )}
        <h2>Login</h2>
        <br />
        <input
          className="form-control7"
          onChange={handleChange}
          type="text"
          id="email"
          placeholder="Email"
        />
        <br />
        <input
          className="form-control7"
          onChange={handleChange}
          type="password"
          id="password"
          placeholder="Password"
        />
        <br />
        <br />
        <button
          disabled={loading}
          type="button"
          onClick={handleClick}
          className="button6"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <br />
      </form>
    </div>
  );
};

export default Login;
