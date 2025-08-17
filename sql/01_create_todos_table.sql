-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'TODO',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    finished_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO todos (title, status) VALUES
('買い物に行く', 'TODO'),
('本を読む', 'IN_PROGRESS'),
('運動する', 'DONE'),
('プロジェクトの設計', 'TODO'),
( 'コードレビュー', 'IN_PROGRESS')
ON CONFLICT DO NOTHING; 