import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "react-hot-toast";
import API from "../../API/API";
import Spinner from "../../components/shared/Spinner";
import { AuthContext } from "../../context/AuthContext";
import Navigation from "../../components/Navigation/Navigation";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      Toast.error("Please provide All Fields ");
      return;
    }
    try {
      const res = await API.post("/auth/register", {
        username,
        email,
        password,
      });
      Toast.success("Registered Successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      Toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="register">
          <Navigation />
          <form className="form-control" onSubmit={handleSubmit}>
            <div className="error">
              {error && <span>{error.response.data.message}</span>}
            </div>
            <h2>Register</h2>
            <br />
            <input
              type="text"
              name="Username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <input type="submit" name="Submit" value="Register" />
            <br />
            <p style={{ marginTop: "15px" }}>
              I have a account ? <Link to="/login">Login Here</Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
