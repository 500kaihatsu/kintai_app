import React, { useState } from "react";

function ClockInButton() {
  const [loading, setLoading] = useState(false); // ボタンがクリックされたかどうか
  const [message, setMessage] = useState(""); // メッセージの表示

  const handleClockIn = async () => {
    setLoading(true); // ローディング中の状態に設定
    setMessage(""); // 既存のメッセージをクリア

    try {
      // 出勤打刻APIにPOSTリクエストを送信
      const response = await fetch("/api/attendance/clock-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",  // ここを追加：認証情報（Cookie）を含める
        body: JSON.stringify({}), // 必要に応じてリクエストボディを追加
      });

      if (response.ok) {
        setMessage("出勤打刻しました！"); // 成功メッセージ
      } else {
        setMessage("出勤打刻に失敗しました。再試行してください。"); // 失敗メッセージ
      }
    } catch (error) {
      setMessage("エラーが発生しました: " + error.message); // エラーメッセージ
    } finally {
      setLoading(false); // ローディング状態を解除
    }
  };

  return (
    <div>
      <button onClick={handleClockIn} disabled={loading}>
        {loading ? "出勤中..." : "出勤打刻"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ClockInButton;

