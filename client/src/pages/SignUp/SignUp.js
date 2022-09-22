import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../../contexts/AuthContext";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/");
    } catch (error) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          type="email"
        />
        <input placeholder="first name" type="text" />
        <input placeholder="last name" type="text" />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />
        <button type="submit">Sign Up</button>
        <p>Already have an account? </p> <Link to="/login">Sign in</Link>
      </form>
    </div>
  );
}

export default SignUp;
