CREATE TABLE attendance_records (
  record_id SERIAL PRIMARY KEY,                 -- 勤怠レコードID（自動採番）
  user_id INTEGER NOT NULL,                     -- ユーザーID（従業員）
  work_date DATE NOT NULL,                      -- 勤務日
  clock_in_time TIMESTAMP,                      -- 出勤時刻
  clock_out_time TIMESTAMP,                     -- 退勤時刻
  total_work_time INTEGER,                      -- 総労働時間（分単位）
  status ATTENDANCE_STATUS NOT NULL DEFAULT 'working', -- 勤怠ステータス
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, work_date),                  -- 1日1レコード制約
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TYPE ATTENDANCE_STATUS AS ENUM ('working', 'absent', 'late', 'on_leave');

