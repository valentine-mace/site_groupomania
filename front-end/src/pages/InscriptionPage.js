import React from "react";
import Header from "../components/Header";
import DataService from "../services.js";
import { useNavigate } from "react-router-dom";

const InscriptionPage = () => {
  let navigate = useNavigate();

  const createUser = async (credentials) => {
    return await DataService.createUser(credentials);
  }

  async function handleSubmit(event){
    event.preventDefault();

    const { identifier, name, surname, pass } = document.forms[0];

    const credentials = {
      identifier : identifier.value,
      name : name.value,
      surname : surname.value,
      password : pass.value
    }

    const user = await createUser(credentials);
    const isCreated = user.data.isCreated;
   
    if(isCreated == true){
      const userId = user.data.userId[0].userId;
      navigate("/home/userId=" + userId, { replace: true });
    }else{
      alert("Identifiant incorrect.");
    }

  }
  return (
    <div className="inscription-page">
      <Header/>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <div className="ident-field">
          <label>Identifiant </label>
          <input type="text" name="identifier" required />
        </div>
        <div className="name-field" >
          <label>Prénom</label>
          <input type="text" name="name" required />
        </div>
        <div className="surname-field" >
          <label>Nom de famille</label>
          <input type="text" name="surname" required />
        </div>
        <div className="pass-field" >
          <label>Mot de passe </label>
          <input type="password" name="pass" required />
        </div>
        <div className="button">
          <input type="submit" />
        </div>
      </form>
    </div>
   );
}

export default InscriptionPage;
