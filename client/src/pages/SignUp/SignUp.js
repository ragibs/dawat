import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase.config";
import { setDoc, doc, where, getDocs } from "firebase/firestore";

function SignUp() {
  const [email, setEmail] = useState("");
  const [firstN, setFirstN] = useState("");
  const [lastN, setLastN] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password).then((cred) => {
        return setDoc(doc(db, "users", cred.user.uid), {
          firstName: `${firstN}`,
          lastName: `${lastN}`,
        });
      });
      navigate("/");
    } catch (e) {
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
        <input
          placeholder="first name"
          type="text"
          onChange={(e) => setFirstN(e.target.value)}
        />
        <input
          placeholder="last name"
          type="text"
          onChange={(e) => setLastN(e.target.value)}
        />
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
