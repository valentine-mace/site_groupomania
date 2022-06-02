import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import DataService from "../services.js";
import { useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";


const ProfilUser = () => {

  let navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const userId = useParams().id;

  useEffect(() => {

    const fetchUser = async () => {
      const getUser = await DataService.getUser(userId);
      setUsers(getUser.data);
    }
    fetchUser();

 
  }, []);

  async function handleClick(event)
  {

    const deleteUser = await DataService.deleteUser(userId);
    if(deleteUser.data == false){
      alert("Echec de suppression du compte");
    }
    else{
      navigate("/", { replace: true });
    }
  }


  return (
    <div>
      <Header/>
      <h1>Profil</h1>
      {users.map((user) =>
        <div>
          <h1>Identifiant: {user.identifier}</h1>
          <h1>Prénom: {user.name}</h1>
          <h1>Nom de famille: {user.surname}</h1>
          <h1>Mot de passe: *****</h1>
          <button onClick={handleClick}>Supprimer mon compte</button>
        </div>
        )}
    </div>
  );
}

export default ProfilUser;
