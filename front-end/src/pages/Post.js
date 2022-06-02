import React, {useState, useEffect}  from "react";
import DataService from "../services.js";
import { useParams} from "react-router-dom"


const Post = () => {

  const [post, setPost] = useState([]);
  const [like, setLike] = useState([]);
  const [dislike, setDislike] = useState([]);
  const [comment, setComment] = useState([]);

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
      const comments = await DataService.getAllComments(2,postId.id);
      setComment(comments.data);
    }
    fetchComments();


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

  //to complete - delete function
  // async function deletePost(){
    
  //   const deletePost = await DataService.deletePost(2,postId.id);
  //   return deletePost;

  // }

  return (
    <div>
        {post.map((post) =>
          <div className="post">
            <h1>{post.title}</h1>
            <h4>Posté le: {sqlToJsDate(post.date)} </h4>
            <p>{post.content}</p>
            <p>Nombre de likes: {like}</p>
            <p>Nombre de dislikes: {dislike}</p>
            <button onClick={likePost}>Like</button>
            <button onClick={dislikePost}>Dislike</button>
            {comment.map((comment) =>
                <p>Commentaire: {comment.content}, {sqlToJsDate(comment.date)}</p>,
                // {comment.userId == userId &&
                //   <div>
                //     <button>Supprimer</button>
                //   </div>
                // }
            )}
            {post.userId === userId &&
            <div>
              {/* <button onClick={() => deletePost()}>Supprimer</button> */}
              <button>Modifier</button>
            </div>
            }

          </div>  
      )}
    </div>
  );
}

export default Post;
