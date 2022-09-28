import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import Header from "../../component/Header/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //error state for submission
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //form validation
    setEmailError(false);
    setPasswordError(false);
    if (email === "") {
      setEmailError(true);
    }
    if (password.length < 6) {
      setPasswordError(true);
    }
    setError("");
    try {
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const { signIn, user } = UserAuth();

  if (user) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div className="login__component">
        <Header />
        <section className="login">
          <div className="login__container">
            <h2 className="login__title">Login</h2>
            <form onSubmit={handleSubmit} className="loginForm">
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                required
                error={emailError}
                helperText="Enter registered email"
              />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="on"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                required
                error={passwordError}
                helperText="Enter your password"
              />
              <Button size="large" variant="contained" type="submit">
                Login
              </Button>
              <p>
                Don't have an account? <Link to="/signup">Sign up</Link>{" "}
              </p>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
