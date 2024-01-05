import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API from "../../API/API";
import Navigation from "../../components/Navigation/Navigation";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await API.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div>
      <div className="login">
        <Navigation />
        <form className="form-control">
          <div className="error"></div>
          <h2>Login</h2>
          <br />
          <input
            onChange={handleChange}
            type="text"
            id="email"
            placeholder="Email"
          />
          <br />
          <input
            onChange={handleChange}
            type="password"
            id="password"
            placeholder="Password"
          />
          <br />
          <br />
          <input
            disabled={loading}
            type="submit"
            value="Login"
            onClick={handleClick}
          />
          <br />
          <p style={{ marginTop: "15px" }}>
            Not Registered? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
