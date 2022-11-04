import "./Header.scss";
import logo from "../../assets/Logo/Untitled-2.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import sam from "../../assets/images/sam.png";

function Header() {
  //account drop down handle
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //  authorization
  const navigate = useNavigate();
  const { logout, user } = UserAuth();

  //logouthandle
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  //if there is no user render this
  if (!user) {
    return (
      <nav className="navbar-header">
        <Link to="/">
          <img className="logo-header" src={logo} alt="logo" />
        </Link>
        <ul className="navbar-header__ul">
          <li className="navbar-header__list">
            <Button>
              <Link className="navbar-header__link" to="/login">
                Login
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="navbar-header">
      <Link to="/">
        <img className="logo-header" src={logo} alt="logo" />
      </Link>
      <ul className="navbar-header__ul">
        <li className="navbar-header__list">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar alt="Samwise Gamgee" src={sam} />
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
            <MenuItem
              onClick={() => {
                navigate("/reservation");
              }}
            >
              My Reservations
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
