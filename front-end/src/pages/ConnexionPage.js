import React, {useState} from "react";
import Header from "../components/Header";
import { NavLink } from "react-router-dom";

const ConnexionPage = () => {

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();

    var { identifier, pass } = document.forms[0];
    console.log(identifier.value, pass.value);
  };

  return (
   <div>
     <Header/>
     <h1>Connexion</h1>
     <form onSubmit={handleSubmit}>
       <div>
         <label>Identifiant </label>
         <input type="text" name="identifier" required />
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
