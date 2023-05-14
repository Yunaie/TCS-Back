import '../styles/Layout.css'
import skull from '../assets/bg3.gif'
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { UserContext } from "./UserContext";
import React, { useContext, useEffect, useState } from "react";

function Layout() {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const title_header = "True Crime Story";
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(userInfo));

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/users/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        // Déconnexion réussie, redirigez l'utilisateur vers la page de connexion
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        // Gérer l'erreur de déconnexion
        throw new Error("Failed to logout");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoggedIn(Boolean(userInfo));
  }, [userInfo]);

  return (
    <div>
      <div className="header">
        <div className="main-title">
          <h1>{title_header}</h1>
        </div>
        <ul className="side-bar">
          <li><Link to="/">Accueil</Link></li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/profile">Profil</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Déconnexion</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Connexion</Link>
            </li>
          )}
          <li><Link to="/articles">Articles</Link></li>
          <li><Link to="/infos">Infos</Link></li>
        </ul>
      </div>
      <div className="body">
        <div className="modal">
          <div className="modal-content">
            <Outlet />
          </div>
        </div>
      </div>
      <img src={skull} className="image-skull" alt="skull-gif" />
    </div>
  );
}

export default Layout;
