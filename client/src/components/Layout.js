import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import '../styles/Layout.css';
import skull from '../assets/bg3.gif';

function Layout({ isLoggedIn, setIsLoggedIn, userId, setUserId }) {
  const title_header = "True Crime Story";
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoggedIn(false);
      setUserId(null);
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  console.log(userId)
  return (  
    <div>
      <div className="header">
        <div className="main-title">
          <h1>{title_header}</h1>
        </div>
        <ul className="side-bar">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link to={`/users/${userId}`}>Profil</Link>
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
          <li>
            <Link to="/articles">Articles</Link>
          </li>
          <li>
            <Link to="/infos">Infos</Link>
          </li>
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
