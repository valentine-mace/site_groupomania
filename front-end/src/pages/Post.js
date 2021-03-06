import React, { useState, useEffect } from "react";
import DataService from "../services.js";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";


const Post = () => {

  let navigate = useNavigate();

  const [post, setPost] = useState([]);
  const [like, setLike] = useState([]);
  const [dislike, setDislike] = useState([]);
  const [comment, setComment] = useState([]);
  const [isAuthorized, setIsAdmin] = useState();
  const [isAuthor, setIsAuthor] = useState();


  const url_split = window.location.href.split('/');
  const postId = useParams();
  const userId = url_split[4];

  useEffect(() => {

    const fetchPost = async () => {
      const aPost = await DataService.getPost(userId, postId.id);
      setPost(aPost.data);
      if((aPost.data[0].userId) == userId){
        setIsAuthor(true);
      }else{
        setIsAuthor(false);
      }
     }
    fetchPost();

    const fetchLikes = async () => {
      const likes = await DataService.getAllLikes(userId, postId.id);
      setLike(likes.data);
    }
    fetchLikes();

    const fetchDislikes = async () => {
      const dislikes = await DataService.getAllDislikes(userId, postId.id);
      setDislike(dislikes.data);
    }
    fetchDislikes();

    const fetchComments = async () => {
      const comments = await DataService.getAllComments(userId, postId.id);
      setComment(comments.data);
    }
    fetchComments();

    const isAdmin = async () => {
      const isAdmin = await DataService.getAdmin(userId);
      setIsAdmin(isAdmin.data);
    }
    isAdmin();

  }, []);

  function sqlToJsDate(sqlDate) {

    let final_date = sqlDate.substr(0, sqlDate.length - 14);
    return new Date(final_date).toLocaleDateString('fr');

  }

  async function likePost() {

    const isLiked = await DataService.likePost(userId, postId.id);
    window.location.reload();
  }

  async function dislikePost() {

    const isDisliked = await DataService.dislikePost(userId, postId.id);
    window.location.reload();
  }

  async function postComment() {

    const content =
    {
      content: document.getElementById('comm').value
    }
    const comment = await DataService.postComment(userId, postId.id, content);

  }

  async function deleteComment(commentId) {

    const commentToDelete = await DataService.deleteComment(userId, postId.id, commentId);
    window.location.reload();

  }

  //to complete - delete function
  async function deletePost() {

    const deletePost = await DataService.deletePost(userId, postId.id);
    navigate("/home/" + userId, { replace: true });

  }

  async function updatePost() {

    const { content } = document.forms[0];

    if (content.value == "") {
      alert("Merci de remplir tous les champs pour valider les changements.");
    }
    else {

      const post = {
        content: content.value,
      }

      const updatePost = await DataService.updatePost(userId, postId.id, post);

      window.location.reload();

    }

  }

  return (
    <div>
      <Header />
      {post.map((post) =>
        <div className="post">
          <form>
            <h1>{post.title}</h1>
            <div className="titre">
              <h4>Post?? le: {sqlToJsDate(post.date)}</h4>
              {((isAuthor == true) || (isAuthorized == true)) &&
              <div className="actions">
                <p onClick={deletePost}><FaTrash /></p>
                <p onClick={updatePost}><FaRegEdit /></p>
              </div>
              }   
            </div>
            <input type="text" name="content" maxlength="300" className="content" placeholder={post.content} />
          </form>
          <div className="likes_dislikes">
            <div className="likes">
              <p onClick={likePost}><FaRegThumbsUp /></p>
              <p>{like}</p>
            </div>
            <div className="likes">
              <p onClick={dislikePost}><FaRegThumbsDown /></p>
              <p>{dislike}</p>
            </div>
          </div>
          <div className="commentaire">
            {comment.map((comment) =>
              <p className="commContent">{comment.content}
                <p className="commDate">-{sqlToJsDate(comment.date)}</p>
                {(comment.userId == userId || isAuthorized == true) &&
                  <p className="commDelete" onClick={() => deleteComment(comment.commentId)}><FaTrash /></p>
                }
              </p>
            )}
          </div>
          <div className="create_comment">
            <form>
              <input id="comm" type="text" maxlength="50" name="content" placeholder="Ecrire un commentaire...(max 50 caract??res)" />
              <button onClick={postComment}>Publier</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
