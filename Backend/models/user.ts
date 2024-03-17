export const UserTableQuery = `CREATE TABLE IF NOT EXISTS users (
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT email_format CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
);`
