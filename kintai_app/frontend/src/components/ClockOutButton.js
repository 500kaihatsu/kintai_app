import React, { useState } from 'react';

function ClockOutButton() {
  const [isClockedOut, setIsClockedOut] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClockOut = async () => {
    setLoading(true);

    try {
      const response = await fetch('/attendance/clock-out', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsClockedOut(true);
        alert('退勤打刻しました！');
      } else {
        alert('退勤処理に失敗しました。再試行してください。');
      }
    } catch (error) {
      alert('退勤処理中にエラーが発生しました: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClockOut}
      disabled={loading || isClockedOut}
      className={`clock-out-button ${isClockedOut ? 'disabled' : ''}`}
    >
      {loading ? '処理中...' : isClockedOut ? '退勤完了' : '退勤'}
    </button>
  );
}

export default ClockOutButton;

