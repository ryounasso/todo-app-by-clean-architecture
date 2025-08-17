-- Statusのenum定義
CREATE TYPE status AS ENUM ('READY', 'DOING', 'DONE');

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status status NOT NULL DEFAULT 'READY',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    finished_at TIMESTAMP WITH TIME ZONE
);

-- Insert sample data
INSERT INTO todos (title, status) VALUES
('買い物に行く', 'READY'),
('本を読む', 'DOING'),
('運動する', 'DONE'),
('プロジェクトの設計', 'READY'),
( 'コードレビュー', 'DOING')
ON CONFLICT DO NOTHING; 