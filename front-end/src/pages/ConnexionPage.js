import React from "react";
import Header from "../components/Header";
import { NavLink } from "react-router-dom";
import DataService from "../services.js";
import { useNavigate } from "react-router-dom";


const ConnexionPage = () => {

  let navigate = useNavigate();

  const findUser = async (credentials) => {
    return await DataService.findUser(credentials);
  }

  async function handleSubmit(event){
    event.preventDefault();

    const { identifier, pass } = document.forms[0];

    const credentials = {
      identifier : identifier.value,
      password : pass.value
    }

    const user = await findUser(credentials);
    const isLogged = user.data.isLogged;

    if(!isLogged){
      alert("Votre identifiant ou mot de passe est incorrect.");
    }
    else{
      const userId = user.data.userId[0].userId;
      navigate("/home/" + userId, { replace: true });

    }


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
