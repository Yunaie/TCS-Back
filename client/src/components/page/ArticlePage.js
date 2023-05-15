import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ArticlePage.css"
import ChargemementPage from "./ChargementPage"

function ArticlePage() {
  const { id } = useParams(); // Récupère l'ID de l'article depuis l'URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Récupérer les détails de l'article depuis l'API en utilisant l'ID
    fetch(`http://localhost:8000/articles/${id}`)
      .then(response => response.json())
      .then(data => {
        // Mettre à jour le state avec les détails de l'article récupéré
        setArticle(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [id]);

  if (!article) {
    return <div>
      <ChargemementPage/>
    </div>; // Afficher un message de chargement pendant la récupération des données
  }

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  return (
    <div className="container2">
      <img className="article-img" src={article.picture} alt={article.titre} />
      <h2 className="article-title">{article.titre}</h2>
      <p className="article-description">{article.description}</p>
      <p className="date">Published on: {formatDate(article.createdAt)}</p>
      <p className="markdown">{article.markdown}</p>
    </div>
  );
}

export default ArticlePage;
