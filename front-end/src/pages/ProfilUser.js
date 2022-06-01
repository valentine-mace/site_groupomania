import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import DataService from "../services.js";

const ProfilUser = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    const userId = 1;

    const fetchUser = async () => {
      const getUser = await DataService.getUser(userId);
      setUsers(getUser.data);
    }
    fetchUser();

  }, []);


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
        </div>
        )}
    </div>
  );
}

export default ProfilUser;
