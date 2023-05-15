import '../styles/Layout.css'
import skull from '../assets/bg3.gif'
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import React from "react";

function Layout({isLoggedIn,setIsLoggedIn}) {
  const title_header = "True Crime Story";
  const navigate = useNavigate();


  const handleLogout = async (ev) => {
    try {
      // Effectuer les actions de déconnexion, tels que la suppression du cookie, etc.
  
      setIsLoggedIn(false);
      navigate("/login"); // Effectuer la redirection vers la page d'accueil ("/")
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <div className="header">
        <div className="main-title">
          <h1>{title_header}</h1>
        </div>
        <ul className="side-bar">
          <li><Link to="/">Accueil</Link></li>
          {isLoggedIn && (
            <>
              <li>
                <Link to="/users">Profil</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Déconnexion</button>
              </li>
            </>
          )}
          {!isLoggedIn && (
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
