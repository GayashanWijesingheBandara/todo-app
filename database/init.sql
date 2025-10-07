-- Create database and user
CREATE DATABASE todoapp;
CREATE USER todouser WITH ENCRYPTED PASSWORD 'todopass';
GRANT ALL PRIVILEGES ON DATABASE todoapp TO todouser;

-- Connect to the todoapp database
\c todoapp;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tasks_completed_created_at ON tasks(completed, created_at DESC);

-- Grant permissions to todouser
GRANT ALL PRIVILEGES ON TABLE tasks TO todouser;
GRANT USAGE, SELECT ON SEQUENCE tasks_id_seq TO todouser;

-- Insert sample data for testing
INSERT INTO tasks (title, description, completed, created_at) VALUES
('Buy books', 'Buy books for next school year', FALSE, NOW() - INTERVAL '1 hour'),
('Clean home', 'Need to clean the bed room', FALSE, NOW() - INTERVAL '30 minutes'),
('Takehome assignment', 'Finish the mid-term assignment', FALSE, NOW() - INTERVAL '15 minutes'),
('Play Cricket', 'Play the soft ball cricket match on next Sunday', FALSE, NOW() - INTERVAL '10 minutes'),
('Help Saman', 'Saman need help with his software project', FALSE, NOW() - INTERVAL '5 minutes');

-- Verify the data
SELECT * FROM tasks WHERE completed = FALSE ORDER BY created_at DESC LIMIT 5;