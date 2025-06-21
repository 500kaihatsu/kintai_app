// src/pages/user/ClockInPage.js
import React, { useState } from "react";
import "./ClockInPage.css";

const ClockInPage = () => {
  const [status, setStatus] = useState("未打刻");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const email = "test@example.com"; // 仮ログイン対応：今後はログイン状態から取得する想定

  const handleClockIn = async () => {
    setErrorMessage("");
    setLoading(true);
    try {
      const response = await fetch("/api/attendance/clock-in", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setStatus("出勤済み");
      } else {
        setErrorMessage("打刻に失敗しました。サーバーを確認してください。");
      }
    } catch (error) {
      setErrorMessage(`通信エラー: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClockOut = async () => {
    setErrorMessage("");
    setLoading(true);
    try {
      const response = await fetch("/api/attendance/clock-out", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setStatus("退勤済み");
      } else {
        setErrorMessage("退勤に失敗しました。サーバーを確認してください。");
      }
    } catch (error) {
      setErrorMessage(`通信エラー: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="clock-in-container">
      <h1>勤怠打刻</h1>
      <p>現在の状態: {status}</p>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="clock-in-button" onClick={handleClockIn} disabled={loading}>
        {loading ? "処理中..." : "出勤する"}
      </button>
      <button className="clock-in-button" onClick={handleClockOut} disabled={loading}>
        {loading ? "処理中..." : "退勤する"}
      </button>
    </div>
  );
};

export default ClockInPage;

