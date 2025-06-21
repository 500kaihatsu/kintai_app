import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminDashboard() {
  const [summary, setSummary] = useState({
    attendCount: 0,
    lateCount: 0,
    editRequestCount: 0,
  });

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("API取得失敗", err));
  }, []);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">管理者ダッシュボード</h1>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold">本日の出勤状況</h2>
            <p>出勤：{summary.attendCount}人　遅刻：{summary.lateCount}人</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold">未対応の打刻修正申請</h2>
            <p>{summary.editRequestCount} 件の申請が未対応です。</p>
          </div>
        </div>
      </main>
    </div>
  );
}
