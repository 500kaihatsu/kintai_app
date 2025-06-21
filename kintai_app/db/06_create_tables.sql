-- 部署テーブル
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- 役職テーブル
CREATE TABLE positions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- 社員テーブル
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  department_id INT REFERENCES departments(id),
  position_id INT REFERENCES positions(id),
  role VARCHAR(20) DEFAULT 'employee',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
