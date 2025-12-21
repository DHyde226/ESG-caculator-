import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/RegisterLogin.module.css";

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

    try {
      const res = await axios.post(apiUrl, form);
      setToken(res.data.token);
      setCompany(res.data.companyName || form.companyName);
    } catch (err) {
      alert(err.response?.data?.error || "Request failed.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          {isLogin ? "Login" : "Register"}
        </h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              className={styles.input}
              placeholder="Company Name"
              value={form.companyName}
              onChange={(e) =>
                setForm({ ...form, companyName: e.target.value })
              }
            />
          )}

          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className={styles.button} type="submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className={styles.toggle} onClick={toggleMode}>
          {isLogin ? "Need to register?" : "Already registered?"}
        </p>
      </div>
    </div>
  );
};

export default RegisterLogin;