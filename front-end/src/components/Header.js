import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./icon-left-font.png";
import { useParams} from "react-router-dom"
import { useLocation } from "react-router-dom";


const Header = () => {
  const current_pathname = window.location.pathname;
  //const userId = useParams().id;
  const url_split = window.location.href.split('/');
  const userId = url_split[4];
  let location = useLocation().pathname;
  return (
    <div className="header">
      <NavLink to= {"/home/" + userId} >
      <img src={logo} alt="Logo Groupomania"></img>
      </NavLink>
      {location == "/home/" + userId &&
        <nav>
          <ul>
            <NavLink to={current_pathname + "/profil/" + userId}><li>Mon profil</li></NavLink>
          </ul>
          <ul>
            <NavLink to={"/"}><li>Se déconnecter</li></NavLink>
          </ul>
        </nav>  
      }
    </div>
  );
}

export default Header;
