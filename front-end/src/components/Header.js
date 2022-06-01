import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./icon-left-font.png";


const Header = () => {
  return (
    <div className="header">
      <NavLink to= {"/home"}>
      {/* <img src="https://www.cerballiance.fr/sites/www.cerballiance.fr/files/styles/main_image_desktop/public/media/image/2020-12/iStock-1212779887-test-antigenique-achetee.jpg?h=c2a00083&itok=ygbJZHJq" alt="Logo Groupomania"></img> */}
      </NavLink>
      <img src={logo} alt="Logo Groupomania"></img>
      {/* <nav>
        <ul>
          <NavLink to={"/profil"}><li>Mon profil</li></NavLink>
        </ul>
      </nav> */}
    </div>
  );
}

export default Header;
