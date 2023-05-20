import React, { useState, useEffect } from "react";
import { useParams,useNavigate} from "react-router-dom";
import "../../styles/ArticlePage.css";
import ChargementPage from "./ChargementPage";
import axios from 'axios';


function ArticlePage({ isLoggedIn, setIsLoggedIn, userId, setUserId }) {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [articleLiked, setArticleLiked] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    const fetchLikedArticles = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/like/${userId}`);
        if (response.status === 200) {
          const likedArticles = response.data;
          setArticleLiked(likedArticles.includes(id));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchLikedArticles();
  }, [userId, id]);

  const handleLike = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/users/like/${userId}`, {
        articleId: article._id
      });

      if (response.status === 200) {
        setArticleLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/users/unlike/${userId}`, {
        articleId: article._id
      });

      if (response.status === 200) {
        setArticleLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!article) {
    return (
      <div>
        <ChargementPage />
      </div>
    );
  }
  console.log(userId)
  return (
    <div className="container2">
      <img className="article-img" src={article.picture} alt={article.titre} />
      <h2 className="article-title">{article.titre}</h2>
      <p className="article-description">{article.description}</p>
      <p className="date">Published on: {formatDate(article.createdAt)}</p>
      <p className="markdown">{article.markdown}</p>
      {isLoggedIn && (
        articleLiked ? (
          <button className="like-button" onClick={handleUnlike}>
            Unlike
          </button>
        ) : (
          <button className="like-button" onClick={handleLike}>
            Like
          </button>
        )
      )}
      <div>
        <CommentPag id={article._id} userId={userId}/>
      </div>
    </div>
  );
}

function CommentPag({ id,userId }) {
  const [comments, setComments] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [comment, setComment] = useState("");
  const [username,setUsername] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommentaires = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/commentaires/article`, {
          article: id
        });
        console.log(response.data);

        if (response.data.errors) {
          // Handle errors appropriately
        } else {
          setComments(response.data);
          const userIds = response.data.map(comment => comment.user);
          fetchUserDetails(userIds);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCommentaires();
  }, [id]);

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchUserDetails = async (userIds) => {
    try {
      const requests = userIds.map(userId => axios.get(`http://localhost:8000/users/${userId}`));
      const responses = await Promise.all(requests);

      const users = responses.map(response => {
        if (response.data.errors) {
          // Handle errors appropriately
        } else {
          return response.data;
        }
      });

      setUserDetails(users);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Récupérer les détails de l'utilisateur depuis l'API en utilisant l'ID
    fetch(`http://localhost:8000/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Mettre à jour le state avec les détails de l'utilisateur récupéré
        setUsername(data.username);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);


  const handleComment = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/commentaires`,
        {
          user: userId,
          commentaire: comment,
          article: id
        },
        {
          withCredentials: true,
        }
      );
      const newComment = response.data;
      setComments([...comments, newComment]); // Ajoute le nouveau commentaire à la liste existante
      setComment(""); // Réinitialise le champ de commentaire
  
      console.log(response.data);
      navigate(`/articles/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="comments">
      <form className="write-comment">
          <h2 className="comment-user">{username}</h2>
          <input
                  type="text"
                  placeholder="Ecrire un commentaire"
                  value={comment}
                  onChange={(ev) => setComment(ev.target.value)}
                />
          <button className="my-button" type="submit" onClick={handleComment}>
                  Publier
          </button>
      </form>
      {comments.map((comment, index) => (
        <div key={comment._id}>
          <h2 className="comment-user">{userDetails[index]?.username}</h2>
          <div className="comment-content">
          <img className="comment-pic" src={userDetails[index]?.picture} alt="User" />
          <p className="comment-date">Published on: {formatDate(comment.createdAt)}</p>
          <p className="comment-text">{comment.commentaire}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArticlePage;
