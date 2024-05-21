## Start Task App

```bash
./main.sh
```

## REST API

### Get Task List

`curl localhost:3000/todo/list.json?user_id=1`

#### Exclude Done Task

`curl "localhost:3000/todo/list.json?user_id=1&exclude_done_task=true" | jq`

#### Specify get fields

`curl -X GET 'localhost:3000/todo/list.json?user_id=1&fields=title' | jq`

### Add Task

`curl -X POST localhost:3000/todo.json -H "Content-Type: application/json" -d '{"title": "テストA", "user_id": 1}' | jq`

### Update Task

`curl -X PUT localhost:3000/todo.json -H "Content-Type: application/json" -d '{"id":1, "user_id":1, "title":"update Task"}' | jq`

### Start Task

`curl -X POST localhost:3000/todo/start.json -H 'Content-Type: application/json' -d '{"id": 1}' | jq`

### Done Task

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
