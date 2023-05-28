import "../Styles/header.css";

import { Link } from "react-router-dom";

import Hamburger from "./Hamburger";
import hireinLogo from "../Images/hirein_logo.png";

const toggleHamburger = () => {
  const hamIcon = document.querySelector(".hamburger-icon");
  const menu = document.querySelector(".drawing-menu");
  menu.className === "drawing-menu"
    ? (menu.className += " menu-toggle")
    : (menu.className = "drawing-menu");
  hamIcon.className === "hamburger-icon"
    ? (hamIcon.className += " cross")
    : (hamIcon.className = "hamburger-icon");
};

const Header = () => {
  return (
    <header className="header">
      <img src={hireinLogo} alt="" className="logo" />

      <Hamburger />
      <div className="drawing-menu">
        <div className="translucent" onClick={toggleHamburger}></div>
        <ul className="menu">
          <li onClick={toggleHamburger}>
            <Link to="/employee-register">Employees </Link>
          </li>
          <li onClick={toggleHamburger}>
            <Link to="/employer-register">Employers </Link>
          </li>
          <li onClick={toggleHamburger}>
            <Link to="/admin">Admin</Link>{" "}
          </li>
          <li onClick={toggleHamburger}>
            <Link to="/contact-us">ContactUs </Link>{" "}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
