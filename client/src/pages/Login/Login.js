import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const { signIn } = UserAuth();
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          type="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />
        <button type="submit">Login</button>
        <p>Don't have an account? </p> <Link to="/signup">Sign up</Link>
      </form>
    </div>
  );
}

export default Login;
