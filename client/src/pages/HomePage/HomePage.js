import "./HomePage.scss";
import OurPicks from "../../component/OurPick/OurPicks";
import logo from "../../assets/Logo/Untitled-2.png";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import video from "../../assets/videos/hero-section-video-1080p.mp4";
import Button from "@mui/material/Button";
import { UserAuth } from "../../contexts/AuthContext";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

//search default state
function HomePage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search !== "") {
      navigate(`/search/${search}`);
      setSearch("");
    }
  };
  //auth
  const { logout, user } = UserAuth();
  //handlelogout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  //account drop down handle

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //different renders based on logged in used or not
  let loginButton;
  if (!user) {
    loginButton = (
      <li className="navbar__list">
        <Button variant="outlined">
          <Link className="navbar__login-link" to="/login">
            Login
          </Link>
        </Button>
      </li>
    );
  } else {
    loginButton = (
      <li className="navbar-header__list">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </li>
    );
  }

  return (
    <>
      <div className="hero">
        <video
          className="video"
          autoPlay
          loop
          muted
          playsInline
          src={video}
        ></video>

        <nav className="navbar">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
          <ul className="navbar__ul">{loginButton}</ul>
        </nav>
        <div className="hero__text-container">
          <h1 className="hero__title">dawat</h1>
          <div className="search__container">
            {/* search box */}
            <form action="" className="search" onSubmit={handleSearch}>
              <input
                className="search__input"
                type="search"
                placeholder="Search city.."
                id="searchInput"
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="search__icon-container">
                <label
                  htmlFor="searchInput"
                  className="search__label"
                  aria-label="Search"
                >
                  <svg viewBox="0 0 1000 1000" title="Search">
                    <path
                      fill="currentColor"
                      d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"
                    />
                  </svg>
                </label>

                <button
                  className="search__submit"
                  aria-label="Search"
                  type="submit"
                >
                  <svg viewBox="0 0 1000 1000" title="Search">
                    <path
                      fill="currentColor"
                      d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <OurPicks />
    </>
  );
}

export default HomePage;
