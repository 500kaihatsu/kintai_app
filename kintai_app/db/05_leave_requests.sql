CREATE TABLE leave_requests (
    request_id SERIAL PRIMARY KEY,           -- 休暇申請ID（主キー）
    user_id INT NOT NULL,                    -- 社員ID（外部キー）
    leave_date DATE NOT NULL,                 -- 休暇申請日
    reason TEXT,                              -- 休暇理由
    status VARCHAR(10) CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending', -- 承認ステータス
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, -- 申請日時
    CONSTRAINT fk_leave_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
