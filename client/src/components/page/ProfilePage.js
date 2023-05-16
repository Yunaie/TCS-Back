import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ProfilePage.css";

function ProfilePage({ IsLoggedIn,setIsLoggedIn,userId, setUserId }) {
  const { id } = useParams(); // Récupère l'ID de l'utilisateur depuis l'URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupérer les détails de l'utilisateur depuis l'API en utilisant l'ID
    fetch(`http://localhost:8000/users/${id}`)
      .then(response => response.json())
      .then(data => {
        // Mettre à jour le state avec les détails de l'utilisateur récupéré
        setUser(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [id]);

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

  return (
    <div className="profile">
      <h1 className="article-title">{user.username}</h1>
      <div className="profile-content">
        <img className="profile-pic" src={user.picture} alt={user.username} />
        <div className="profile-container">
          <p className="article-description">{user.bio}</p>
          <p className="date">Published on: {formatDate(user.createdAt)}</p>   
        </div>
      </div>

    </div>
  );
}

export default ProfilePage;