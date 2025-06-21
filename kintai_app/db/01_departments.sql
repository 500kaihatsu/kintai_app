CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,       -- 部署ID（主キー）
    department_name VARCHAR(100) NOT NULL UNIQUE -- 部署名（ユニーク）
);

