// ClockInClockOut.js
import React, { useState } from "react";
import axios from "axios";

const ClockInClockOut = () => {
  const [isClockedIn, setIsClockedIn] = useState(false); // 出勤中かどうかの状態

  const handleClockIn = async () => {
    try {
      const response = await axios.post("/attendance/clock-in");
      if (response.status === 200) {
        setIsClockedIn(true);
        alert("出勤打刻しました");
      }
    } catch (error) {
      alert("出勤打刻に失敗しました");
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await axios.post("/attendance/clock-out");
      if (response.status === 200) {
        setIsClockedIn(false);
        alert("退勤打刻しました");
      }
    } catch (error) {
      alert("退勤打刻に失敗しました");
    }
  };

  return (
    <div>
      <h1>{isClockedIn ? "出勤中" : "退勤中"}</h1>
      <button onClick={handleClockIn} disabled={isClockedIn}>
        出勤
      </button>
      <button onClick={handleClockOut} disabled={!isClockedIn}>
        退勤
      </button>
    </div>
  );
};

export default ClockInClockOut;

