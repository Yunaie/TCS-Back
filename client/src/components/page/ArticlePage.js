import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ArticlePage.css";
import ChargementPage from "./ChargementPage";
import axios from 'axios';

function ArticlePage({ isLoggedIn, setIsLoggedIn, userId, setUserId }) {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [articleLiked, setArticleLiked] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/articles/${id}`)
      .then(response => response.json())
      .then(data => {
        setArticle(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [id]);

  useEffect(() => {
    const fetchLikedArticles = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${userId}/liked-articles`);
        if (response.status === 200) {
          const likedArticles = response.data.likedArticles;
          setArticleLiked(likedArticles.includes(id));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchLikedArticles();
  }, [userId, id]);

  if (!article) {
    return (
      <div>
        <ChargementPage/>
      </div>
    );
  }

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

  return (
    <div className="container2">
      <img className="article-img" src={article.picture} alt={article.titre} />
      <h2 className="article-title">{article.titre}</h2>
      <p className="article-description">{article.description}</p>
      <p className="date">Published on: {formatDate(article.createdAt)}</p>
      <p className="markdown">{article.markdown}</p>
      {articleLiked ? (
        <button className="like" onClick={handleUnlike}>
              <svg viewBox="0 0 17.503 15.625" height="20.625" width="20.503" xmlns="http://www.w3.org/2000/svg" class="icon">
                <path transform="translate(0 0)" d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z" id="Fill"></path>
              </svg>
        </button>
      ) : (
        <button className="like" onClick={handleLike}>
            <svg viewBox="0 0 17.503 15.625" height="20.625" width="20.503" xmlns="http://www.w3.org/2000/svg" class="icon">
              <path transform="translate(0 0)" d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z" id="Fill"></path>
            </svg>
        </button>
      )}
    </div>
  );
}

export default ArticlePage;
