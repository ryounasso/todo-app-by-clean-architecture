## Start Todo App

```bash
./main.sh
```

## REST API

### Get Todo List

`curl localhost:3000/todo/list.json?user_id=1`

#### Exclude Done Todo

`curl "localhost:3000/todo/list.json?user_id=1&exclude_done_todo=true" | jq`

#### Specify get fields

`curl -X GET 'localhost:3000/todo/list.json?user_id=1&fields=title' | jq`

### Add Todo

`curl -X POST localhost:3000/todo.json -H "Content-Type: application/json" -d '{"title": "テストA", "user_id": 1}' | jq`

### Update Todo

`curl -X PUT localhost:3000/todo.json -H "Content-Type: application/json" -d '{"id":1, "user_id":1, "title":"update Task"}' | jq`

### Start Todo

`curl -X POST localhost:3000/todo/start.json -H 'Content-Type: application/json' -d '{"id": 1}' | jq`

### Done Todo

`curl -X POST localhost:3000/todo/done.json -H 'Content-Type: application/json' -d '{"id": 1}' | jq`

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
