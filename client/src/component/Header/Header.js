import "./Header.scss";
import logo from "../../assets/Logo/Untitled-2.png";
import AccountSettings from "../AccountSettings/AccountSettings";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { logout, user } = UserAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  if (!user) {
    return (
      <>
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="logo_container">
              <img className="logo" src={logo} alt="" />
            </li>
            <li className="navbar-accountHolder">
              <button>
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ul>
        </nav>
      </>
    );
  }
  return (
    <>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="logo_container">
            <img className="logo" src={logo} alt="" />
          </li>
          <li className="navbar-accountHolder">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
