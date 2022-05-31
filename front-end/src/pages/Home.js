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
  console.log(users);

  return (
    <div>
      <Header/>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
