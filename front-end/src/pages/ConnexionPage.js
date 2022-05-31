import React, {useState} from "react";
import Header from "../components/Header";
import { NavLink } from "react-router-dom";

const ConnexionPage = () => {

  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
   <div>
     <Header/>
     <h1>Connexion</h1>
     <form>
       <div>
         <label>Identifiant </label>
         <input type="text" name="uname" required />
       </div>
       <div >
         <label>Mot de passe </label>
         <input type="password" name="pass" required />
       </div>
       <div>
         <input type="submit" />
       </div>
     </form>
     <p>Pas encore de compte?</p>
     <NavLink
          to={{
            pathname:"/signup/"   
          }}>
     <button>Inscrivez-vous!</button></NavLink>
   </div>
  );
}

export default ConnexionPage;
