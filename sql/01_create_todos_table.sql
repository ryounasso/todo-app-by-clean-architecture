-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'TODO',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for user_id
CREATE INDEX IF NOT EXISTS idx_todos_user_id ON todos(user_id);

-- Create index for status
CREATE INDEX IF NOT EXISTS idx_todos_status ON todos(status);

-- Create index for created_at
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at);

-- Insert sample data
INSERT INTO todos (user_id, title, status) VALUES
(1, '買い物に行く', 'TODO'),
(1, '本を読む', 'IN_PROGRESS'),
(1, '運動する', 'DONE'),
(2, 'プロジェクトの設計', 'TODO'),
(2, 'コードレビュー', 'IN_PROGRESS')
ON CONFLICT DO NOTHING; 