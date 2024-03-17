export const TaskTableQuery = `CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    user_email VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
);`
