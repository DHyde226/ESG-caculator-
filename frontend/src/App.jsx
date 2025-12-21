// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Documentation from "./components/About";
import RegisterLogin from "./components/RegisterLogin";
import ESGForm from "./components/ESGForm";
import ESGHistory from "./components/ESGHistory";
import "./App.css";


function App() {
  const [token, setToken] = useState(null);
  const [company, setCompany] = useState("");

  return (
<Router>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/auth">Login</Link>
    {token && (
      <>
        <Link to="/form">ESG Form</Link>
        <Link to="/history">History</Link>
      </>
    )}
  </nav>

  <main>
    <Routes>
      <Route path="/" element={<Documentation />} />
      <Route
        path="/auth"
        element={<RegisterLogin setToken={setToken} setCompany={setCompany} />}
      />
      <Route
        path="/form"
        element={<ESGForm token={token} company={company} />}
      />
      <Route
        path="/history"
        element={<ESGHistory token={token} />}
      />
    </Routes>
  </main>
</Router>


  );
}

export default App;
