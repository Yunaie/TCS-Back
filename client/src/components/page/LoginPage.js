import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import "../../styles/LoginPage.css";
import { Link } from "react-router-dom";
import axios from "axios";

function LoginPage({ isLoggedIn,setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (ev) => {
    ev.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8000/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response);

      if (response.data.errors) {
        setErrorMessage("Erreur lors de la connexion");
      } else {
        setIsLoggedIn(true); // Mettre à jour l'état global de connexion
        setRedirect(true); // Définir la redirection
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Informations incorrectes");
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
