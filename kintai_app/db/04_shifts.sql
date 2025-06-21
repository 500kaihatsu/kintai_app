CREATE TABLE shifts (
    shift_id SERIAL PRIMARY KEY,            -- シフトID（主キー）
    user_id INT NOT NULL,                    -- 社員ID（外部キー）
    shift_date DATE NOT NULL,                -- シフトの日付
    start_time TIME NOT NULL,                -- シフト開始時間
    end_time TIME NOT NULL,                  -- シフト終了時間
    CONSTRAINT fk_shift_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


