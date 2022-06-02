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

  async function deleteUser()
  {

    const deleteUser = await DataService.deleteUser(userId);
    if(deleteUser.data == false){
      alert("Echec de suppression du compte");
    }
    else{
      navigate("/", { replace: true });
    }
  }

  async function handleSubmit(event){

    event.preventDefault();

    const { name, surname, pass } = document.forms[0];

    const credentials = {
      name : name.value,
      surname : surname.value,
      password : pass.value
    }

    console.log(credentials);

    const user = await DataService.updateUser(userId, credentials);

    window.location.reload();
    
  }


  return (
    <div>
      <Header/>
      <h1>Profil</h1>
      {users.map((user) =>
      <form onSubmit={handleSubmit}>
        <div className="ident-field">
          <label>Identifiant: </label>
          <p>{user.identifier}</p> 
        </div>
        <div className="name-field" >
          <label>Prénom</label>
          <input type="text" name="name" placeholder={user.name} />
        </div>
        <div className="surname-field" >
          <label>Nom de famille</label>
          <input type="text" name="surname" placeholder={user.surname}   />
        </div>
        <div className="pass-field" >
          <label>Mot de passe </label>
          <input type="password" name="pass" placeholder="******" />
        </div>
        <div className="button">
          <input type="submit" value="Valider les changements" />
        </div>
      </form>
        )}
      <button onClick={deleteUser}>Supprimer mon compte</button>
      {/* <form>

        <div>
          <h1>Identifiant: {user.identifier}</h1>
          <h1>Nom de famille: {user.surname}</h1>
          <h1>Mot de passe: *****</h1>
        </div>

      </form> */}
    </div>
  );
}

export default ProfilUser;
