import React, { useState, useEffect } from "react";
import "../../styles/InfoPage.css";
import '../../styles/IndexPage.css';
import axios from 'axios';

function CommentPage({ id }) {
  const [comments, setComments] = useState([]);

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

  return (
    <div className="comments">
      {comments.map(comment => (
        <div key={comment._id}>
          <h2>{comment.user}</h2>
          <p >Published on: {formatDate(comment.createdAt)}</p>
          <p>{comment.commentaire}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentPage;
