// src/pages/login/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // 必要に応じてCSSを作成してください

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ← ここを必ず追加！
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // ログイン成功 → ダッシュボードページへ遷移
        navigate("/dashboard");  // ここを修正
      } else {
        const text = await response.text();
        setErrorMessage(text || "ログインに失敗しました");
      }
    } catch (err) {
      setErrorMessage("通信エラー: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>ログイン</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>メールアドレス:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label>パスワード:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default LoginPage;

