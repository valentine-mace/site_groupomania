import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./icon-left-font.png";
import { useParams} from "react-router-dom"


const Header = () => {
  const current_pathname = window.location.pathname;
  const userId = useParams().id;
  return (
    <div className="header">
      <NavLink to= {"/home/" + userId} >
      <img src={logo} alt="Logo Groupomania"></img>
      </NavLink>
      <nav>
        <ul>
          <NavLink to={current_pathname + "/profil/" + userId}><li>Mon profil</li></NavLink>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
