import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import DataService from "../services.js";
import { NavLink } from "react-router-dom";
import { useParams} from "react-router-dom"

const Posts = () => {

  const curent_path = window.location.pathname;

  const [posts, setPosts] = useState([]);

  const userId = useParams().id;

  useEffect(() => {

    const fetchPosts = async () => {
      const allPosts = await DataService.getAllPosts(userId);
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
      <h1>Tous les posts</h1>
      <div className="home">
        <div className="posts">
          {posts.map((post) =>
            <NavLink
            to={{
              pathname: curent_path + "/post/"+ post.postId,   
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
    </div>

  );
}

export default Posts;
