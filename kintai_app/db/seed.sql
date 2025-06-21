
TRUNCATE attendance_records, leave_requests, shifts, users, departments RESTART IDENTITY CASCADE;

INSERT INTO departments (department_id, department_name) VALUES
  (1, '開発部'),
  (2, '営業部'),
  (3, '人事部');

INSERT INTO users (user_id, name, email, password, role) VALUES
  (1, '佐藤 太郎', 'taro.sato@example.com', 'dummyhash1', 'employee'),
  (2, '鈴木 花子', 'hanako.suzuki@example.com', 'dummyhash2', 'employee'),
  (3, '田中 一郎', 'ichiro.tanaka@example.com', 'dummyhash3', 'employee'),
  (4, 'テスト太郎', 'user@example.com', 'password123', 'employee');



INSERT INTO shifts (shift_id, user_id, shift_date, start_time, end_time) VALUES
  (1, 1, '2025-05-01', '09:00', '18:00'),
  (2, 2, '2025-05-01', '10:00', '19:00');

INSERT INTO attendance_records (record_id, user_id, work_date, clock_in_time, clock_out_time) VALUES
  (1, 1, '2025-05-01', '2025-05-01 09:05:00', '2025-05-01 18:10:00'),
  (2, 2, '2025-05-01', '2025-05-01 10:02:00', '2025-05-01 19:00:00');

INSERT INTO leave_requests (request_id, user_id, leave_date, reason, status) VALUES
  (1, 3, '2025-05-02', '体調不良', 'approved');

