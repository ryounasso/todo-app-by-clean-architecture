# Phase 2 完了ログ - ドメイン層の実装

## 完了日時
2024年12月19日

## 実装内容

### 2.1 ドメインエンティティの作成

#### Status.java enum
- 場所: `src/main/java/com/todoapp/domain/entity/Status.java`
- 内容: TODO、IN_PROGRESS、DONEの3つのステータス
- 特徴: displayNameフィールドとゲッターメソッドを実装

#### Todo.java JPAエンティティ
- 場所: `src/main/java/com/todoapp/domain/entity/Todo.java`
- フィールド: id, userId, title, status, createdAt, updatedAt, startedAt, completedAt
- JPAアノテーション: @Entity, @Table, @Id, @Column, @Enumerated
- ビジネスロジック: updateTitle(), start(), done()
- ゲッターメソッド: 全フィールドのゲッター

### 2.2 DTOクラスの作成（Record活用）

#### 作成したDTO一覧
- `AddTodoDto.java` - Todo追加用（userId: long, title: String）
- `TodoDto.java` - Todo表示用（全フィールド）
- `TodoListDto.java` - Todo一覧表示用（List<TodoDto>）
- `TodoTitleDto.java` - タイトル更新用（title: String）
- `StartDto.java` - Todo開始用（todoId: long）
- `DoneDto.java` - Todo完了用（todoId: long）

#### 実装方針
- Java 21のRecord機能を活用
- 必須値はプリミティブ型（long）を使用
- バリデーションをコンストラクタに実装
- nullチェックとtrim処理を実装

### 2.3 リポジトリインターフェースの定義

#### TodoRepository.java
- 場所: `src/main/java/com/todoapp/domain/repository/TodoRepository.java`
- 継承: CrudRepository<Todo, Long>
- カスタムメソッド: findByUserId(long userId)

## 技術的な決定事項

### ID型の選択
- エンティティID、DTOのID系フィールドは`long`型で統一
- 理由: 拡張性、DBとの整合性、将来の大規模化に対応

### バリデーション方針
- Recordのコンストラクタでバリデーション実装
- nullチェック、空文字チェック、正の値チェック
- 例外: IllegalArgumentException

## 設定・環境対応

### VS Code設定
- `.vscode/settings.json`を作成
- Javaソースパス設定でパッケージ認識問題を解決

## コンパイル確認
- 全ファイルのコンパイル成功を確認
- Gradleビルド: `./gradlew compileJava` 成功

## 次のPhase
Phase 3: インフラストラクチャ層の実装
- TodoRepositoryImpl.javaの実装
- データベース設定の確認 