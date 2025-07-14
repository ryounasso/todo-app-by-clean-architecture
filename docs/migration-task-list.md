# Java 21/Spring Boot移行タスクリスト

## 概要
このドキュメントは、ADR-001に基づいてTypeScript/NestJSからJava 21/Spring Bootへの移行を実行するためのタスクリストです。

## 移行の前提条件
- Java 21がインストールされていること
- Docker環境が利用可能であること
- PostgreSQLデータベースが利用可能であること

## タスク一覧

### Phase 1: プロジェクト初期化 + 設定とDI
**目標**: Java 21 + Spring Boot 3.2の基本プロジェクト構造と設定を作成

#### 1.1 プロジェクト生成（Spring Boot CLI使用）
- [ ] Spring Boot CLIのインストール確認
  ```bash
  # macOSの場合
  brew install spring-boot
  
  # または、SDKMANを使用
  sdk install springboot
  ```
- [ ] `spring init`コマンドでプロジェクト生成
  ```bash
  spring init --build=gradle --java-version=21 --dependencies=web,data-jpa,validation,postgresql --package-name=com.todoapp todo-app
  ```
- [ ] 生成されたプロジェクトの構造確認
- [ ] 既存のプロジェクトディレクトリに統合

#### 1.2 クリーンアーキテクチャ構造の作成
- [ ] `src/main/java/com/todoapp/domain/`ディレクトリの作成
- [ ] `src/main/java/com/todoapp/application/`ディレクトリの作成
- [ ] `src/main/java/com/todoapp/infrastructure/`ディレクトリの作成
- [ ] `src/main/java/com/todoapp/config/`ディレクトリの作成
- [ ] 不要なディレクトリの削除（controller, service, repository等）

#### 1.3 基本設定ファイルの作成
- [ ] `application.yml`の作成（application.propertiesを置き換え）
- [ ] `Dockerfile`の作成
- [ ] `docker-compose.yml`の更新
- [ ] `.gitignore`の更新（Java/Spring Boot用）

#### 1.4 メインアプリケーションクラスの作成
- [ ] `TodoApplication.java`の作成
- [ ] 基本的なSpring Boot設定の実装
- [ ] コンポーネントスキャンの設定

#### 1.5 設定とDIの実装
- [ ] `TodoConfig.java`の作成
- [ ] データソース設定の確認
- [ ] JPA設定の確認
- [ ] コンストラクタインジェクションの実装確認
- [ ] コンポーネントスキャンの確認
- [ ] Bean定義の確認

### Phase 2: ドメイン層の実装
**目標**: JPAエンティティとRecord活用したDTOの作成

#### 2.1 ドメインエンティティの作成
- [ ] `src/main/java/com/todoapp/domain/entity/Status.java` enumの作成
- [ ] `src/main/java/com/todoapp/domain/entity/Todo.java` JPAエンティティの作成
  - [ ] 基本的なフィールド定義
  - [ ] JPAアノテーションの追加
  - [ ] ビジネスロジックメソッドの実装（updateTitle, start, done）
  - [ ] ゲッターメソッドの実装

#### 2.2 DTOクラスの作成（Record活用）
- [ ] `src/main/java/com/todoapp/application/dto/AddTodoDto.java`の作成
- [ ] `src/main/java/com/todoapp/application/dto/TodoDto.java`の作成
- [ ] `src/main/java/com/todoapp/application/dto/TodoListDto.java`の作成
- [ ] `src/main/java/com/todoapp/application/dto/TodoTitleDto.java`の作成
- [ ] `src/main/java/com/todoapp/application/dto/StartDto.java`の作成
- [ ] `src/main/java/com/todoapp/application/dto/DoneDto.java`の作成

#### 2.3 リポジトリインターフェースの定義
- [ ] `src/main/java/com/todoapp/domain/repository/TodoRepository.java`の作成
- [ ] Spring Data JPAの基本メソッド定義
- [ ] カスタムクエリメソッドの定義

### Phase 3: インフラストラクチャ層の実装
**目標**: Spring Data JPAリポジトリの実装

#### 3.1 リポジトリ実装
- [ ] `src/main/java/com/todoapp/infrastructure/persistence/repository/TodoRepositoryImpl.java`の作成
- [ ] 基本的なCRUD操作の確認
- [ ] カスタムクエリメソッドの動作確認

#### 3.2 データベース設定
- [ ] PostgreSQL接続設定の確認
- [ ] データベースマイグレーションスクリプトの準備
- [ ] テストデータの準備

### Phase 4: アプリケーション層の実装
**目標**: シンプルなサービス実装

#### 4.1 ファクトリークラスの作成
- [ ] `src/main/java/com/todoapp/application/factory/TodoFactory.java`インターフェースの作成
- [ ] `src/main/java/com/todoapp/application/factory/TodoFactoryImpl.java`の実装
  - [ ] `createTodo`メソッドの実装
  - [ ] `createTodoDto`メソッドの実装
  - [ ] `createTodoListDto`メソッドの実装

#### 4.2 サービス層の実装
- [ ] `src/main/java/com/todoapp/application/service/TodoService.java`インターフェースの作成
- [ ] `src/main/java/com/todoapp/application/service/TodoServiceImpl.java`の実装
  - [ ] `getTodoList`メソッドの実装
  - [ ] `addTodo`メソッドの実装
  - [ ] `updateTitle`メソッドの実装
  - [ ] `start`メソッドの実装
  - [ ] `done`メソッドの実装
- [ ] トランザクション管理の確認

### Phase 5: Web層の実装
**目標**: 標準的なRESTコントローラーの実装

#### 5.1 リクエスト/レスポンスDTOの作成
- [ ] `src/main/java/com/todoapp/infrastructure/web/dto/AddTodoRequest.java`の作成
- [ ] `src/main/java/com/todoapp/infrastructure/web/dto/AddTodoResponse.java`の作成
- [ ] `src/main/java/com/todoapp/infrastructure/web/dto/UpdateTitleRequest.java`の作成
- [ ] バリデーションアノテーションの追加

#### 5.2 コントローラーの実装
- [ ] `src/main/java/com/todoapp/infrastructure/web/controller/TodoController.java`の作成
- [ ] `GET /todo/list.json`エンドポイントの実装
- [ ] `POST /todo/todo.json`エンドポイントの実装
- [ ] `PUT /todo/{id}/title`エンドポイントの実装
- [ ] `PUT /todo/{id}/start`エンドポイントの実装
- [ ] `PUT /todo/{id}/done`エンドポイントの実装

#### 5.3 例外処理の実装
- [ ] `src/main/java/com/todoapp/infrastructure/web/exception/GlobalExceptionHandler.java`の作成
- [ ] カスタム例外クラスの作成
- [ ] エラーレスポンスの統一

### Phase 6: ビルドとデプロイ
**目標**: アプリケーションのビルドとデプロイ

#### 6.1 ビルド設定
- [ ] Gradleビルドの確認
  ```bash
  ./gradlew build
  ```
- [ ] JARファイルの生成確認
- [ ] 依存関係の解決確認

#### 6.2 Docker化
- [ ] Dockerイメージのビルド確認
  ```bash
  docker build -t todo-app .
  ```
- [ ] docker-compose.ymlの動作確認
  ```bash
  docker-compose up -d
  ```
- [ ] コンテナ間の通信確認

#### 6.3 デプロイテスト
- [ ] ローカル環境での動作確認
- [ ] データベース接続の確認
- [ ] APIエンドポイントの動作確認

### Phase 7: 移行の検証
**目標**: 既存機能との同等性確認

#### 7.1 機能テスト
- [ ] Todo一覧取得機能の確認
  ```bash
  curl "http://localhost:3000/todo/list.json?user_id=1"
  ```
- [ ] Todo追加機能の確認
  ```bash
  curl -X POST "http://localhost:3000/todo/todo.json" \
       -H "Content-Type: application/json" \
       -d '{"userId": 1, "title": "新しいタスク"}'
  ```
- [ ] Todo更新機能の確認
- [ ] Todoステータス変更機能の確認

#### 7.2 パフォーマンステスト
- [ ] レスポンス時間の測定
- [ ] データベース接続プールの確認
- [ ] メモリ使用量の確認

#### 7.3 エラーハンドリングの確認
- [ ] バリデーションエラーの確認
- [ ] データベースエラーの確認
- [ ] 予期しないエラーの確認

## 完了条件

### 必須条件
- [ ] すべてのAPIエンドポイントが正常に動作すること
- [ ] データベースのCRUD操作が正常に動作すること
- [ ] Docker環境で正常に動作すること

### 推奨条件
- [ ] 既存のNestJSアプリケーションと同等の機能を提供すること
- [ ] レスポンス時間が既存アプリケーションと同等以下であること
- [ ] エラーハンドリングが適切に実装されていること
- [ ] ログ出力が適切に設定されていること

## 注意事項

### 技術的な注意点
1. **Java 21の新機能**: Record、Pattern Matching、String Templatesを適切に活用する
2. **Spring Boot 3.2**: 最新の機能とベストプラクティスに従う
3. **JPA**: 適切なアノテーションとクエリメソッドを使用する
4. **自動DI**: コンストラクタインジェクションを優先する
5. **クリーンアーキテクチャ**: 依存関係の方向を正しく保つ

### 移行時の注意点
1. **段階的移行**: 各Phaseを順次完了してから次に進む
2. **バックアップ**: 既存のコードとデータを適切にバックアップする
3. **ドキュメント**: 実装内容を適切にドキュメント化する
4. **Spring Boot CLI**: 生成されたプロジェクトの構造を理解してからカスタマイズする

## 参考資料
- [ADR-001: TypeScript/NestJSからJava 21/Spring Bootへの移行](./ADR-001-java-spring-boot-migration.md)
- [Spring Boot 3.2 Reference](https://docs.spring.io/spring-boot/docs/3.2.0/reference/html/)
- [Spring Data JPA Reference](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
- [Java 21 Documentation](https://docs.oracle.com/en/java/javase/21/)
- [Spring Boot CLI Reference](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-cli.html)