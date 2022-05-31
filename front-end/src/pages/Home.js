import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import DataService from "../services.js";
import { NavLink } from "react-router-dom";

const Home = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchPosts = async () => {
      const allPosts = await DataService.getAllPosts(2);
      setPosts(allPosts.data);
    }
    fetchPosts();

  }, []);

  function sqlToJsDate(sqlDate){

    let final_date= sqlDate.substr(0,sqlDate.length-14);

    return final_date;
  }

  return (
    <div>
      <Header/>
      <h1>Home</h1>
      <button>+ Nouveau Post</button>
      <div className="home">
        {posts.map((post) =>
          <NavLink
          to={{
            pathname:"/post/"+ post.postId,   
          }}>
            <div className="card">
              <h1>{post.title}</h1>
              <h4>Posté le: {sqlToJsDate(post.date)} </h4>
              <p>{post.content}</p>
            </div>
          </NavLink>
   
        )}
      </div>
    </div>

  );
}

export default Home;
