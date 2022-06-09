import React, {useState, useEffect}  from "react";
import DataService from "../services.js";
import { useParams} from "react-router-dom";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";


const Post = () => {

  let navigate = useNavigate();

  const [post, setPost] = useState([]);
  const [like, setLike] = useState([]);
  const [dislike, setDislike] = useState([]);
  const [comment, setComment] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState();

  const url_split = window.location.href.split('/');
  const postId = useParams();
  const userId = url_split[4];

  useEffect(() => {

    const fetchPost = async () => {
      const aPost = await DataService.getPost(2,postId.id);
      setPost(aPost.data);
    }
    fetchPost();

    const fetchLikes = async () => {
      const likes = await DataService.getAllLikes(2,postId.id);
      setLike(likes.data);
    }
    fetchLikes();

    const fetchDislikes = async () => {
      const dislikes = await DataService.getAllDislikes(2,postId.id);
      setDislike(dislikes.data);
    }
    fetchDislikes();

    const fetchComments = async () => {
      const comments = await DataService.getAllComments(userId,postId.id);
      setComment(comments.data);
    }
    fetchComments();

    const fetchAuthorization = async () => {
      const isAdmin = await DataService.getAdmin(userId);
      setIsAuthorized(isAdmin.data);
    }
    fetchAuthorization();

  }, []);

  function sqlToJsDate(sqlDate){

    let final_date= sqlDate.substr(0,sqlDate.length-14);

    return final_date;
  }

  async function likePost(){

    const isLiked = await DataService.likePost(userId,postId.id);
    window.location.reload();
  }

  async function dislikePost(){

    const isDisliked = await DataService.dislikePost(userId,postId.id);
    window.location.reload();
  }

  async function postComment(){
  
    const content  = 
    {
      content: document.querySelector('input').value
    } 
    const comment = await DataService.postComment(userId,postId.id,content);
    window.location.reload();

  }

  async function deleteComment(commentId){
  
    const commentToDelete = await DataService.deleteComment(userId,postId.id,commentId);
    window.location.reload();

  }

  //to complete - delete function
  async function deletePost(){
    
    const deletePost = await DataService.deletePost(userId,postId.id);
    navigate("/home/" + userId, { replace: true });

  }

  async function updatePost(){

    const { title, content } = document.forms[0];

    console.log(document.forms[0]);

    if((title.value == "") || (content.value == "")){
        alert("Merci de remplir tous les champs pour valider les changements.");
    }
    else{

      const post = {
        title : title.value,
        content : content.value,
      }

      const updatePost = await DataService.updatePost(userId, postId.id, post);

      window.location.reload();

    }

  }

  return (
    <div>
      <Header/>
      {post.map((post) =>
        <div className="post">
          <form>
            <div>
              <input type="text" name="title" placeholder={post.title}/>
            </div>
            <input type="text" name="content" placeholder={post.content}/>
            <h4>Posté le: {sqlToJsDate(post.date)} </h4>
          </form>
          <p>Nombre de likes: {like}</p>
          <p>Nombre de dislikes: {dislike}</p>
          <button onClick={likePost}>Like</button>
          <button onClick={dislikePost}>Dislike</button>
          {comment.map((comment) =>
            <p>Commentaire: {comment.content}, {sqlToJsDate(comment.date)},
              {(comment.userId == userId || isAuthorized == true) &&
                <button onClick={() => deleteComment(comment.commentId)}>Supprimer</button>
              }
              </p>
          )}
          <div>
            <form>
              <input type="text" name="content" placeholder="Ecrire un commentaire..." />
              <button onClick={postComment}>Envoyer</button>
            </form>
          </div>
            <div>
              <button onClick={deletePost}>Supprimer post</button>
              <button onClick={updatePost}>Modifier post</button>
            </div>
        </div>
      )}
    </div>
  );
}

export default Post;
