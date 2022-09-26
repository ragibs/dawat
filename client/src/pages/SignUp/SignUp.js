import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../../contexts/AuthContext";

import { db } from "../../firebase.config";
import { setDoc, doc } from "firebase/firestore";
import Header from "../../component/Header/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SignUp() {
  const [email, setEmail] = useState("");
  const [firstN, setFirstN] = useState("");
  const [lastN, setLastN] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  //error state for submission
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //form validation
    setEmailError(false);
    setPasswordError(false);
    setFirstNameError(false);
    setLastNameError(false);
    if (email === "") {
      setEmailError(true);
    }
    if (password.length < 6) {
      setPasswordError(true);
    }
    if (firstN === "") {
      setFirstNameError(true);
    }
    if (lastN === "") {
      setLastNameError(true);
    }
    setError("");
    try {
      await createUser(email, password).then((cred) => {
        return setDoc(doc(db, "users", cred.user.uid), {
          firstName: `${firstN}`,
          lastName: `${lastN}`,
          userId: `${cred.user.uid}`,
        });
      });

      navigate("/");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="signUp__component">
      <Header />
      <section className="signUp">
        <div className="signUp__container">
          <h2 className="signUp__title">Sign Up</h2>
          <form className="signUpForm" onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => setFirstN(e.target.value)}
              type="text"
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              required
              helperText="Your first name"
              error={firstNameError}
              style={{ width: 300 }}
            />
            <TextField
              onChange={(e) => setLastN(e.target.value)}
              type="text"
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              required
              helperText="Your last name"
              error={lastNameError}
              style={{ width: 300 }}
            />
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              required
              helperText="Please enter a valid email address"
              error={emailError}
              style={{ width: 300 }}
            />

            <TextField
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              autoComplete="on"
              required
              helperText="Password with more than 6 characters"
              error={passwordError}
              style={{ width: 300 }}
            />

            <Button size="large" variant="contained" type="submit">
              Sign Up
            </Button>
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
