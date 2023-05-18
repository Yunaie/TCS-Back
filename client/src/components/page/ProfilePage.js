import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../../styles/ProfilePage.css";
import "../../styles/IndexPage.css";

function ProfilePage({ isLoggedIn, setIsLoggedIn, userId, setUserId }) {
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    // Récupérer les détails de l'utilisateur depuis l'API en utilisant l'ID
    fetch(`http://localhost:8000/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Mettre à jour le state avec les détails de l'utilisateur récupéré
        setUser(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [userId]);

  useEffect(() => {
    // Récupérer les détails de l'utilisateur depuis l'API en utilisant l'ID
    fetch(`http://localhost:8000/users/like/${userId}`)
      .then((response2) => response2.json())
      .then((data) => {
        // Mettre à jour le state avec les détails de l'utilisateur récupéré
        setLikes(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>; // Afficher un message de chargement pendant la récupération des données
  }

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  console.log(likes);

  return (
    <div>
        <div className="profile">
          <h1 className="article-title">{user.username}</h1>
          <div className="profile-content">
            <img className="profile-pic" src={user.picture} alt={user.username} />
            <div className="profile-container">
              <p className="article-description">{user.bio}</p>
              <p className="date">Compte créé le : {formatDate(user.createdAt)}</p>
            </div>  
          </div>
        </div>     
        {likes.length === 0 ? (
          <p className="latest"> Pas d'articles aimés</p>
        ) : (
          
          <div className="index">
            <p className="latest">Articles likés : </p>
            <div className="container">
            {likes.map((like, index) => (
              <ArticleCard key={index} id={like} />
            ))}
          </div>
          </div>
        )}
  </div>
);
}
function ArticleCard({ id }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Récupérer les détails de l'article depuis l'API en utilisant l'ID
    fetch(`http://localhost:8000/articles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Mettre à jour le state avec les détails de l'article récupéré
        setArticle(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

  if (!article) {
    return <p>Loading article...</p>;
  }

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div >
          <div className="article">
            <Link to={`/articles/${article._id}`}>
              <img className="article-image" src={article.picture} alt={article.titre} />
            </Link>
            <Link to={`/articles/${article._id}`}>
              <h2 className="title">{article.titre}</h2>
            </Link>
            <p className="date">Published on: {formatDate(article.createdAt)}</p>
            <p className="description">{article.description}</p>
          </div>
    </div>
  );
}


export default ProfilePage;
