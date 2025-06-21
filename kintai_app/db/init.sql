DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles WHERE rolname = 'user'
   ) THEN
      CREATE USER "user" WITH PASSWORD 'password';
   END IF;
END
$do$;
GRANT ALL PRIVILEGES ON DATABASE mydb TO "user";


