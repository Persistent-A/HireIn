import '../Styles/header.css'


import { Link, useNavigate } from 'react-router-dom'

import Hamburger from "./Hamburger"
import hireinLogo from "../Images/hirein_logo.png"

const toggleHamburger = () => {
  const hamIcon = document.querySelector('.hamburger-icon')
  const menu = document.querySelector('.drawing-menu')
  menu.className === 'drawing-menu' ? menu.className += ' menu-toggle' : menu.className = 'drawing-menu'
  hamIcon.className === 'hamburger-icon' ? hamIcon.className += ' cross' : hamIcon.className = 'hamburger-icon'
}

const Header = () => {
  return (
    <header className="header">
        <img src={hireinLogo} alt="" className="logo"/>
        <Hamburger/>
        <div className="drawing-menu">
          <div className="translucent" onClick={toggleHamburger}></div>
          <ul className="menu">
            <li onClick={toggleHamburger}><a href='google' rel='noreferrer'><Link to="/employee-register">Employees </Link> </a></li>
            <li onClick={toggleHamburger}><a href='google' rel='noreferrer'><Link to="/employer-register">Employers </Link> </a></li>
            <li onClick={toggleHamburger}><a href='google' rel='noreferrer'><Link to="">Services  </Link> </a></li>
            <li onClick={toggleHamburger}><a href='google' rel='noreferrer'><Link to="">Contact Us</Link> </a></li>
          </ul>
        </div>
    </header>
  )
}

export default Header
