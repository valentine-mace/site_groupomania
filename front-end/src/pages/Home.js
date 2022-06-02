import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import DataService from "../services.js";
import { NavLink } from "react-router-dom";
import { useParams} from "react-router-dom"

const Home = () => {

  const curent_path = window.location.pathname;

  const [posts, setPosts] = useState([]);

  const userId = useParams().id;

  useEffect(() => {

    const fetchPosts = async () => {
      const allPosts = await DataService.getRecentPosts(userId);
      setPosts(allPosts.data);
    }
    fetchPosts();

  }, []);

  function sqlToJsDate(sqlDate){

    let final_date= sqlDate.substr(0,sqlDate.length-14);

    return final_date;
  }

  async function handleSubmit(event){

    event.preventDefault();

    const { title, content } = document.forms[0];

    const test = "test";

    const post = {
      title : title.value,
      content : content.value,
      image : test
    }

    const createPost = await DataService.createPost(userId,post);
    console.log(createPost);
  }

  return (
    <div>
      <Header/>
      <h1>Home</h1>
      <div className="home">
        <div className="createPost">
          <h1>Ecrivez un post</h1>
          <form onSubmit={handleSubmit}>
            <div className="title-field">
              <label>Titre </label>
              <input type="text" name="title" required />
            </div>
            <div className="content-field" >
              <label>Contenu</label>
              <input type="text" name="content" required />
            </div>
            {/* <div className="image-field" >
              <label>Image</label>
              <input type="file" name="image" required />
            </div> */}
            <div className="button">
              <input type="submit" />
            </div>
          </form>
        </div>
        <div className="posts_display">
          <h1>Posts récents</h1>
          <div className="posts">
          <div className="afficher-plus">
            <NavLink to={{ pathname: curent_path + "/posts"}}>
              <h5>Afficher plus</h5></NavLink>
          </div>
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
    </div>

  );
}

export default Home;
