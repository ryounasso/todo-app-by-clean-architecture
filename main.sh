#!/bin/bash

while true
do

# 対話形式でユーザーからアクションを入力
echo "Choose an action:"
echo "1. Get todo list"
echo "2. Create todo"
echo "3. Change todo title"
echo "4. Start todo"
echo "5. Finish todo"
echo "6. Exit"
read -p "Enter the number of the action: " action

# アクションに基づいてAPIのURLを決定
base_url="http://localhost:3000"
case $action in
  1)
    api_url="$base_url/todo/list.json"
    method="GET"
    query=""

    # クエリパラメータを入力
    # doneタスクを除去するかどうか尋ねる
    read -p "Exclude done todo? (yes/no): " exclude_done
    if [ "$exclude_done" == "yes" ]; then
      query="$query?exclude_done_todo=true"
    elif [ "$exclude_done" == "no" ]; then
      query="$query?exclude_done_todo=false"
    fi

    # 取得したいフィールドを尋ねる
    read -p "Enter fields to retrieve (comma separated): " fields
    if [ -n "$fields" ]; then
      query="$query&fields=$fields"
    fi
    ;;
  2)
    api_url="$base_url/todo.json"
    method="POST"

    read -p "Enter title: " title

    json_data="{\"title\": \"$title\"}"
    ;;
  3)
    api_url="$base_url/todo/title.json"
    method="PUT"

    read -p "Enter todo_id: " todo_id

    read -p "Enter title: " title

    json_data="{\"todoId\": \"$todo_id\", \"title\": \"$title\"}"
    ;;
  4)
    api_url="$base_url/todo/start.json"
    method="POST"

    read -p "Enter todo_id: " todo_id

    json_data="{\"id\": \"$todo_id\"}"
    ;;

  5)
    api_url="$base_url/todo/done.json"
    method="POST"

    read -p "Enter todo_id: " todo_id

    json_data="{\"id\": \"$todo_id\"}"
    ;;
  6)
    echo "Exiting..."
    exit 0
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
echo $'\n'

done