// AttendanceHistory.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceHistory = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get("/attendance/attendance-report");
        setAttendanceData(response.data);
      } catch (error) {
        alert("勤怠データの取得に失敗しました");
      }
    };
    fetchAttendanceData();
  }, []);

  return (
    <div>
      <h2>勤怠履歴</h2>
      <table>
        <thead>
          <tr>
            <th>日付</th>
            <th>出勤時間</th>
            <th>退勤時間</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((attendance) => (
            <tr key={attendance.id}>
              <td>{attendance.date}</td>
              <td>{attendance.clockIn}</td>
              <td>{attendance.clockOut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceHistory;

