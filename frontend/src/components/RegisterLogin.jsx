import React, { useState } from "react";
import axios from "axios";

const RegisterLogin = ({ setToken, setCompany }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    password: "",
  });

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const route = isLogin ? "login" : "register";

    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/${route}`;
    console.log("Posting to:", apiUrl); // for debugging

    try {
      const res = await axios.post(apiUrl, form);
      setToken(res.data.token);
      setCompany(res.data.companyName || form.companyName);
    } catch (err) {
      console.error("API error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Request failed.");
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            placeholder="Company Name"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
        <p onClick={toggleMode} style={{ cursor: "pointer" }}>
          {isLogin ? "Need to register?" : "Already registered?"}
        </p>
      </form>
    </div>
  );
};

export default RegisterLogin;
