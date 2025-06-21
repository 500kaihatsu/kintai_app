import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://backend:8080/attendance/attendance-report") 
      .then((response) => {
        setAttendanceData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching attendance report", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>出勤レポート</h1>
      <table>
        <thead>
          <tr>
            <th>ユーザー名</th>
            <th>出勤日</th>
            <th>出勤時刻</th>
            <th>退勤時刻</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((attendance, index) => (
            <tr key={index}>
              <td>{attendance.userName}</td>
              <td>{attendance.date}</td>
              <td>{attendance.clockInTime}</td>
              <td>{attendance.clockOutTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceReport;

