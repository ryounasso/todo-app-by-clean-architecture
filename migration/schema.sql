-- Statusのenum定義
CREATE TYPE status AS ENUM ('READY', 'DOING', 'DONE');

-- todosテーブルの作成
CREATE TABLE todos (
   id BIGSERIAL PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   status status NOT NULL DEFAULT 'READY',
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   finished_at TIMESTAMP NULL
);

-- インデックスの作成
