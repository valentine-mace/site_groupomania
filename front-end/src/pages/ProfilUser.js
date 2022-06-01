import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import DataService from "../services.js";

const ProfilUser = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    const userId = 2;

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
        <div className="card">
          <h1>{user.identifier}</h1>
          <h1>{user.name}</h1>
          <h1>{user.surname}</h1>
        </div>
        )}
    </div>
  );
}

export default ProfilUser;
