import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./UserContext"
import LoginPage from "./page/LoginPage"
import RegisterPage from "./page/RegisterPage"

import "../styles/Reset.css"
import IndexPage from "./page/IndexPage"
import Layout from "./Layout";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<IndexPage/>}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage/>} />
          </Route>  
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
