import React, {useState} from "react";
import Header from "../components/Header";
import { NavLink } from "react-router-dom";
import DataService from "../services.js";

const ConnexionPage = () => {

  
  const [userIds, setUserIds] = useState([]);

  const handleSubmit = (event) => {

    event.preventDefault();

    var { identifier, pass } = document.forms[0];

    let userToFind = {
      identifier : identifier.value,
      password : pass.value
    }
    
    const findUser = async () => {
      const user = await DataService.findUser(userToFind);
      console.log(user);
      const isLogged = user.data;
      // if(isLogged === 0){
      //   alert("L'identifiant n'existe pas.");
      // }
      // else if(isLogged === 2){
      //   alert("Mot de passe incorrect");
      // }
      // else if(isLogged === 1){
      //   console.log("OK");
      // }
    }
    findUser();

    // const getIdUser = async () => {
    //   const findUserId = await DataService.getUserId(identifier.value);
    //   setUserIds(findUserId.data[0].userId);
    //   console.log(userIds);
    // }
    // getIdUser();


  };

  return (
   <div className="connexion-page">
     <Header/>
     <h1>Connexion</h1>
     <form onSubmit={handleSubmit}>
       <div className="ident-field">
         <label>Identifiant </label>
         <input type="text" name="identifier" required />
       </div>
       <div className="pass-field" >
         <label>Mot de passe </label>
         <input type="password" name="pass" required />
       </div>
       <div className="button">
         <input type="submit" />
       <NavLink
            to={{
              pathname:"/home/"  
            }}>
         <button>Connexion</button>
         </NavLink>
       </div>
     </form>
     <div className="inscription">
      <p>Pas encore de compte?</p>
      <NavLink
            to={{
              pathname:"/signup/"   
            }}>
      <button>Inscrivez-vous!</button></NavLink>
     </div>
   </div>
  );
}

export default ConnexionPage;
