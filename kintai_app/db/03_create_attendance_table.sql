-- 勤怠レコードテーブルを削除（再作成用）
DROP TABLE IF EXISTS attendance_records CASCADE;

-- テーブル作成（statusはVARCHAR型に修正、休憩項目追加）
CREATE TABLE attendance_records (
  record_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  work_date DATE NOT NULL,
  clock_in_time TIMESTAMP,
  clock_out_time TIMESTAMP,
  break_start_time TIMESTAMP,
  break_end_time TIMESTAMP,
  break_duration NUMERIC(21, 0) DEFAULT 3600, -- ← 修正された型
  status VARCHAR(20) NOT NULL DEFAULT 'working',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, work_date),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- updated_at 自動更新用関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- トリガー作成（updated_atの自動更新）
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON attendance_records
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

