// src/components/AdminSidebar.jsx
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 h-screen bg-gray-100 p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6">管理メニュー</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/admin/dashboard" className="text-blue-600 hover:underline">
            ダッシュボード
          </Link>
        </li>
        <li>
          <Link to="/admin/attendance" className="text-blue-600 hover:underline">
            勤怠一覧
          </Link>
        </li>
        <li>
          <Link to="/admin/edit-requests" className="text-blue-600 hover:underline">
            打刻修正申請
          </Link>
        </li>
      </ul>
    </div>
  );
}
