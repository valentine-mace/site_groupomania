import React, {useState} from "react";
import Header from "../components/Header";
import { NavLink } from "react-router-dom";
import DataService from "../services.js";

const ConnexionPage = () => {

  
  //const [loggedIn, setLoggedIn] = useState([]);

  const handleSubmit = (event) => {

    event.preventDefault();

    var { identifier, pass } = document.forms[0];

    let userToFind = {
      identifier : identifier.value,
      password : pass.value
    }
    
    const findUser = async () => {
      const user = await DataService.findUser(userToFind);
      const isLogged = user.data;
      console.log(user);
      if(isLogged === 0){
        alert("L'identifiant n'existe pas.");
      }
      else if(isLogged === 2){
        alert("Mot de passe incorrect");
      }
      else if(isLogged === 1){
        console.log("OK");
      }
    }
    findUser();

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
