import React, {useState, useEffect} from "react";
import Header from "../components/Header";
// import Post from "../components/Posts";
import DataService from "../services.js";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {

    const fetchUsers = async () => {
      const allUsers = await DataService.getAllUsers();
      setUsers(allUsers.data);
    }
    fetchUsers();

  }, []);

  return (
    <div>
      <Header/>
      <h1>Home</h1>
      {users.map((user) => <h2>{user.name}</h2>)}
    </div>
  );
}

export default Home;
