import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import ArticlesPage from './page/ArticlesPage';
import ArticlePage from './page/ArticlePage';
import InfoPage from './page/InfoPage';
import ProfilePage from './page/ProfilePage';
import ProfilesPage from './page/ProfilesPage';
import PagePerso from "./page/PagePerso";
import '../styles/Reset.css';
import IndexPage from './page/IndexPage';
import Layout from './Layout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userId={userId}
              setUserId={setUserId}
            />
          }
        >
          <Route path="/" element={<IndexPage />} />
          <Route
            path="/login"
            element={
              <LoginPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userId={userId}
              setUserId={setUserId}
              />
            }
          />
          <Route path="/profile" element={<PagePerso  isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userId={userId}
              setUserId={setUserId} />} />
          <Route path="/register" element={<RegisterPage  isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userId={userId}
              setUserId={setUserId} />} />
          <Route path="/articles" element={<ArticlesPage  isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userId={userId}
              setUserId={setUserId} />} />
          <Route path="/articles/:id" element={<ArticlePage  isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userId={userId}
              setUserId={setUserId} />} />
          <Route path="/infos" element={<InfoPage  isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userId={userId}
              setUserId={setUserId} />} />
          <Route path="/users/:id" element={<ProfilePage  isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userId={userId}
              setUserId={setUserId} />} />
          <Route path="/users" element={<ProfilesPage  isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userId={userId}
              setUserId={setUserId} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
