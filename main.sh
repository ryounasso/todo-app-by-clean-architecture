#!/bin/bash

# 対話形式でユーザーからアクションを入力
echo "Choose an action:"
echo "1. Get task list"
echo "2. Create task"
echo "3. Update task"
echo "4. Start task"
echo "5. Finish task"
read -p "Enter the number of the action: " action

# アクションに基づいてAPIのURLを決定
base_url="http://localhost:3000"
case $action in
  1)
    api_url="$base_url/todo/list.json"
    method="GET"
    # クエリパラメータを入力
    read -p "Enter user_id: " user_id
    if [ -n "$user_id" ]; then
      query="?user_id=$user_id"

      # doneタスクを除去するかどうか尋ねる
      read -p "Exclude done tasks? (yes/no): " exclude_done
      if [ "$exclude_done" == "yes" ]; then
        query="$query&exclude_done_task=true"
      fi

      # 取得したいフィールドを尋ねる
      read -p "Enter fields to retrieve (comma separated): " fields
      if [ -n "$fields" ]; then
        query="$query&fields=$fields"
      fi
    fi
    ;;
  2)
    api_url="$base_url/todo.json"
    method="POST"

    read -p "Enter user_id: " user_id

    read -p "Enter title: " title

    json_data="{\"user_id\": \"$user_id\", \"title\": \"$title\"}"
    ;;
  3)
    api_url="$base_url/todo.json"
    method="PUT"
    ;;
  4)
    api_url="$base_url/todo/start.json"
    method="POST"
    read -p "Enter user_id: " user_id

    read -p "Enter task_id: " task_id

    json_data="{\"user_id\": \"$user_id\", \"id\": \"$task_id\"}"
    ;;

  5)
    api_url="$base_url/todo/done.json"
    method="POST"

    read -p "Enter user_id: " user_id

    read -p "Enter task_id: " task_id

    json_data="{\"user_id\": \"$user_id\", \"id\": \"$task_id\"}"
    ;;
  *)
    echo "Invalid action"
    exit 1
    ;;
esac

# APIを呼び出す
if [[ "$method" == "GET" ]]; then
  response=$(curl -s -X GET "$api_url$query" | jq)
else
  response=$(curl -s -X "$method" "$api_url" -H "Content-Type: application/json" -d "$json_data" | jq)
fi

# 結果を表示
echo "API Response:"
echo "$response"