// src/pages/user/AttendancePage.js
import React, { useEffect, useState } from "react";

const AttendancePage = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch("/api/attendance/my-records", {
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "データ取得に失敗しました");
        }

        const data = await res.json();
        setAttendanceList(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAttendance();
  }, []);

  // ✅ 総労働時間の計算（休憩時間を考慮）
  const calculateTotalWorkHours = (record) => {
    if (record.clockIn && record.clockOut) {
      const clockIn = new Date(record.clockIn);
      const clockOut = new Date(record.clockOut);
      let workDuration = (clockOut - clockIn) / 1000 / 60; // 分単位

      // ✅ 休憩時間をデフォルト1時間として計算
      const breakDuration = record.breakDuration ? record.breakDuration / 60 : 60;
      workDuration -= breakDuration;

      return `${Math.floor(workDuration / 60)}時間 ${workDuration % 60}分`;
    }
    return "未計算";
  };

  return (
    <div>
      <h2>出勤簿</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 出勤簿テーブル */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>日付</th>
            <th>出勤時刻</th>
            <th>退勤時刻</th>
            <th>休憩時間</th>
            <th>総労働時間</th>
            <th>ステータス</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.clockIn ? record.clockIn.replace("T", " ").slice(0, 16) : "-"}</td>
              <td>{record.clockOut ? record.clockOut.replace("T", " ").slice(0, 16) : "-"}</td>
              <td>{record.breakDuration ? `${record.breakDuration / 60}時間` : "1時間（デフォルト）"}</td>
              <td>{calculateTotalWorkHours(record)}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePage;
