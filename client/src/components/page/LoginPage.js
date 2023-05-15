import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import "../../styles/LoginPage.css";
import { Link } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Nouvelle variable d'état pour le message d'erreur
  const { setUserInfo } = useContext(UserContext);

  const login = async (ev) => {
    ev.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8000/users/login`, {
        email,
        password,
      }, {
        withCredentials: true,
      });

      console.log(response);

      if (response.data.errors) {
        setErrorMessage("Erreur lors de la connexion"); // Définir le message d'erreur
      } else {
        window.location = "/";
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Informations incorrectes"); // Définir le message d'erreur
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={login}>
      <h1 className="login-title">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>} 
      <button className="my-button">Connexion</button>
      <Link to="/register">
        <button className="my-button">Pas de compte ?</button>
      </Link>
    </form>
  );
}

export default LoginPage;
