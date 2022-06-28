import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import DataService from "../services.js";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";


const Home = () => {

  const curent_path = window.location.pathname;

  const [posts, setPosts] = useState([]);

  const userId = useParams().id;

  useEffect(() => {

    const fetchPosts = async () => {
      const allPosts = await DataService.getRecentPosts(userId);
      var posts = [];
      posts.push(allPosts.data);
      var postsReversed = [];
      postsReversed = posts[0].reverse();
      setPosts(postsReversed);

    }
    fetchPosts();

  }, []);

  function sqlToJsDate(sqlDate) {

    let final_date = sqlDate.substr(0, sqlDate.length - 14);
    return new Date(final_date).toLocaleDateString('fr');
  }

  async function handleSubmit(event) {

    event.preventDefault();

    const { title, content, image } = document.forms[0];
    // console.log(image.files[0]);

    const test = image.files[0];

    const post = {
      title: title.value,
      content: content.value,
      image: test
    }

    const createPost = await DataService.createPost(userId, post);

    window.location.reload();
  }

  return (
    <div>
      <Header />
      <div className="home">
        <div className="createPost_display">
          <h1>Ecrivez un post:</h1>
          <form onSubmit={handleSubmit}>
            <div className="title-field">
              <label>Titre (max: 30 caractères) </label>
              <input type="text" name="title" maxlength="50" required />
            </div>
            <div className="content-field" >
              <label>Contenu (max: 300 caractères)</label>
              <input type="text" name="content" maxlength="300" required />
            </div>
            <div className="image-field" >
              <label>Image</label>
              <input type="file" name="image" required />
            </div>
            <div className="button">
              <input type="submit" value="Publier" />
            </div>
          </form>
        </div>
        <div className="posts_display">
          <div className="texte">
            <h1 className="posts_recents">Posts récents</h1>
            <div>
            <NavLink to={{ pathname: curent_path + "/post" }}>
            <h1 className="afficher_plus">+ Afficher plus</h1></NavLink>
            </div>
          </div>
          <div className="posts">

            {posts.map((post, index) =>
              <NavLink
                to={{
                  pathname: curent_path + "/post/" + post.postId,
                }}>
                <div className="card" key={index}>
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
