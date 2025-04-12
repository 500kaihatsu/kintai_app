CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,                   -- ユーザーID（自動採番）
  name VARCHAR(100) NOT NULL,                   -- 氏名
  email VARCHAR(100) NOT NULL UNIQUE,            -- メールアドレス
  password TEXT NOT NULL,                       -- パスワード（ハッシュ化）
  role USER_ROLE NOT NULL DEFAULT 'employee',    -- 権限（ENUM 使用）
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE USER_ROLE AS ENUM ('employee', 'admin');

