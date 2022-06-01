import React from "react";
import { NavLink } from "react-router-dom";


const Header = () => {
  return (
    <div className="header">
      <img src="https://www.cerballiance.fr/sites/www.cerballiance.fr/files/styles/main_image_desktop/public/media/image/2020-12/iStock-1212779887-test-antigenique-achetee.jpg?h=c2a00083&itok=ygbJZHJq" alt="Logo Groupomania"></img>
      {/* <img src="icon-left-font.png" alt="Logo Groupomania"></img> */}
      {/* <nav>
        <ul>
          <NavLink to={"/profil"}><li>Mon profil</li></NavLink>
        </ul>
      </nav> */}
    </div>
  );
}

export default Header;
