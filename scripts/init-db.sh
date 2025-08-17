# カラー出力用
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# .envファイルから環境変数を読み込み
if [ -f ".env" ]; then
    echo "Loading environment variables from .env file..."
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "Warning: .env file not found"
fi

# 設定値
DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASS}
DB_HOST=${DB_HOST}
DB_PORT="5432"

echo -e "${YELLOW}データベース初期化を開始します...${NC}"

# PostgreSQLコンテナが起動するまで待機
echo -e "${YELLOW}PostgreSQLコンテナの起動を待機中...${NC}"
until docker compose exec db pg_isready -U postgres > /dev/null 2>&1; do
    echo "PostgreSQLの起動を待機中..."
    sleep 2
done

echo -e "${GREEN}PostgreSQLに接続できました${NC}"

# アクティブなセッションを強制終了
echo -e "${YELLOW}アクティブなセッションを終了中...${NC}"
docker compose exec db psql -U postgres -c "
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = '$DB_NAME'
  AND pid <> pg_backend_pid();" || true

# 少し待機
sleep 2

# データベースの削除（存在する場合）
echo -e "${YELLOW}既存のデータベースを削除中...${NC}"
docker compose exec db psql -U postgres -c "DROP DATABASE IF EXISTS $DB_NAME;" || true

# ユーザーが$DB_USERの場合はスキップ
if [ "$DB_USER" != "$DB_USER" ]; then
    # ユーザーの削除（存在する場合）
    echo -e "${YELLOW}既存のユーザーを削除中...${NC}"
    docker compose exec db psql -U postgres -c "DROP USER IF EXISTS $DB_USER;" || true

    # ユーザーの作成
    echo -e "${YELLOW}ユーザーを作成中...${NC}"
    docker compose exec db psql -U postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';"
fi

# ユーザーの作成
echo -e "${YELLOW}ユーザーを作成中...${NC}"
docker compose exec db psql -U postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';"

# データベースの作成
echo -e "${YELLOW}データベースを作成中...${NC}"
docker compose exec db psql -U postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"

# 権限の付与
echo -e "${YELLOW}権限を付与中...${NC}"
docker compose exec db psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"

# スキーマファイルが存在する場合は実行
if [ -f "migration/schema.sql" ]; then
    echo -e "${YELLOW}スキーマを作成中...${NC}"
    docker compose exec -T db psql -U $DB_USER -d $DB_NAME < migration/schema.sql
fi

# 初期データファイルが存在する場合は実行
if [ -f "migration/data.sql" ]; then
    echo -e "${YELLOW}初期データを投入中...${NC}"
    docker compose exec -T db psql -U $DB_USER -d $DB_NAME < migration/data.sql
fi

echo -e "${GREEN}データベース初期化が完了しました！${NC}"
echo -e "${GREEN}データベース名: $DB_NAME${NC}"
echo -e "${GREEN}ユーザー名: $DB_USER${NC}"
echo -e "${GREEN}ホスト: $DB_HOST:$DB_PORT${NC}"