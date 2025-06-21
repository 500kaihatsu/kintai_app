-- users テーブル
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user'
);

-- 初期ユーザー（管理者）
INSERT INTO users (username, password, role) VALUES (
  'admin',
  '$2a$10$JiTtZJAmD7mVO1R/k9EbS.AOcQbIF6fGmpT.kTxy0x0YwAtYOQnFC',
  'admin'
);
