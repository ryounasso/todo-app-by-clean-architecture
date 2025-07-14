# ADR-001: TypeScript/NestJSからJava 21/Spring Bootへの移行

## ステータス
承認済み

## 日付
2024年12月19日

## コンテキスト
現在のTypeScript/NestJSベースのTodoアプリケーションをJava 21とSpring Bootベースに移行する必要がある。クリーンアーキテクチャの原則を維持しながら、Java 21の最新機能を活用して高性能で保守性の高いアプリケーションを構築する。

## 決定事項
TypeScript/NestJSベースのアプリケーションをJava 21とSpring Boot 3.2ベースに移行する。

## 理由
1. **Java 21の最新機能活用**: Record、Pattern Matching、String Templates等の最新機能により、開発効率が向上
2. **Spring Bootの成熟したエコシステム**: 豊富なライブラリとコミュニティサポート
3. **自動DI**: Spring Bootの依存性注入により、設定の簡素化とテストの容易さ
4. **Spring Data JPA**: 型安全で効率的なデータアクセス層

## 結果

### 技術スタックの対応

| 現在 | Java/Spring Boot対応 |
|------|---------------------|
| NestJS | Spring Boot 3.2 |
| TypeScript | Java 21 |
| Prisma ORM | **Spring Data JPA** |
| PostgreSQL | PostgreSQL (変更なし) |
| Docker Compose | Docker Compose (変更なし) |

### プロジェクト構造

```
src/main/java/com/todoapp/
├── domain/                    # ドメイン層
│   ├── entity/
│   │   ├── Todo.java
│   │   ├── User.java
│   │   └── Status.java
│   └── repository/
│       └── TodoRepository.java
├── application/               # アプリケーション層
│   ├── service/
│   │   ├── TodoService.java
│   │   └── TodoServiceImpl.java
│   ├── dto/
│   │   ├── AddTodoDto.java
│   │   ├── TodoDto.java
│   │   └── TodoListDto.java
│   └── factory/
│       └── TodoFactory.java
├── infrastructure/            # インフラストラクチャ層
│   ├── persistence/
│   │   └── repository/
│   │       └── TodoRepositoryImpl.java
│   └── web/
│       ├── controller/
│       │   ├── TodoController.java
│       │   └── dto/
│       │       ├── AddTodoRequest.java
│       │       └── TodoResponse.java
│       └── exception/
│           └── GlobalExceptionHandler.java
├── config/
│   └── TodoConfig.java
└── TodoApplication.java
```

### Java 21の新機能活用

#### 1. Record
- DTOクラスで使用
- ボイラープレートコード削減
- イミュータビリティの確保

#### 2. Pattern Matching
- switch式での条件分岐
- より読みやすく保守しやすいコード

#### 3. String Templates
- エラーメッセージの記述で使用
- 可読性の向上

#### 4. Sequenced Collections
- `toList()`メソッドの使用
- 最適化されたコレクション操作

### 主要な実装ポイント

#### 自動DI設定
```java
@SpringBootApplication
@ComponentScan(basePackages = "com.todoapp")
public class TodoApplication {
    public static void main(String[] args) {
        SpringApplication.run(TodoApplication.class, args);
    }
}
```

#### ドメインエンティティ（Record活用）
```java
public record AddTodoDto(Long userId, String title) {
    public AddTodoDto {
        if (userId == null) throw new IllegalArgumentException("userId is required");
        if (title == null || title.isBlank()) throw new IllegalArgumentException("title is required");
    }
}
```

#### サービス層（JPA活用）
```java
@Service
@Transactional
public class TodoServiceImpl implements TodoService {
    
    @Override
    public TodoListDto getTodoList(Long userId, List<String> fields, Boolean excludeDoneTodo) {
        List<Todo> todoList;
        
        if (excludeDoneTodo != null && excludeDoneTodo) {
            todoList = todoRepository.findByUserIdAndStatusNotOrderByIdAsc(userId, Status.DONE);
        } else {
            todoList = todoRepository.findByUserIdOrderByIdAsc(userId);
        }
        
        return todoFactory.createTodoListDto(todoList, fields);
    }
    
    @Override
    public TodoDto addTodo(AddTodoDto addTodoDto) {
        Todo todo = todoFactory.createTodo(addTodoDto);
        Todo savedTodo = todoRepository.save(todo);
        return todoFactory.createTodoDto(savedTodo);
    }
}
```

#### JPAエンティティとリポジトリ
```java
// Todo.java
@Entity
@Table(name = "todo")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "finished_at")
    private LocalDateTime finishedAt;
    
    // ビジネスロジック
    public void updateTitle(String newTitle) {
        if (newTitle == null || newTitle.isBlank()) {
            throw new IllegalArgumentException("title should not empty");
        }
        this.title = newTitle;
    }
    
    public void start() {
        this.status = Status.DOING;
    }
    
    public void done() {
        this.status = Status.DONE;
        this.finishedAt = LocalDateTime.now();
    }
}

// TodoRepository.java
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUserIdOrderByIdAsc(Long userId);
    List<Todo> findByUserIdAndStatusNotOrderByIdAsc(Long userId, Status status);
}
```

### 設定ファイル

#### build.gradle
```gradle
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.2.0'
    id 'io.spring.dependency-management' version '1.1.4'
}

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.postgresql:postgresql'
}
```

#### application.yml
```yaml
spring:
  datasource:
    url: jdbc:postgresql://db:5432/${DB_NAME}
    username: ${DB_USER}
    password: ${DB_PASS}
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true

server:
  port: 3000
```

#### Dockerfile
```dockerfile
FROM openjdk:21-jdk-slim

WORKDIR /app
COPY build/libs/*.jar app.jar

EXPOSE 3000
CMD ["java", "-jar", "app.jar"]
```

### 移行の優先順位

1. **プロジェクト初期化**: Java 21 + Spring Boot 3.2
2. **ドメイン層**: JPAエンティティとRecord活用したDTO
3. **インフラ層**: Spring Data JPAリポジトリ
4. **アプリケーション層**: シンプルなサービス実装
5. **Web層**: 標準的なRESTコントローラー
6. **設定**: 必要最低限の設定
7. **テスト**: JUnit 5 + TestContainers

### 期待される効果

#### パフォーマンス向上
- Spring Bootの最適化されたデフォルト設定
- JPAによる効率的なデータアクセス
- HikariCPによる高性能なコネクションプール

#### 開発効率向上
- Recordによるボイラープレートコード削減
- JPAによる自動クエリ生成
- 自動DIによる設定の簡素化

#### 保守性向上
- 型安全性の向上
- 標準的なJPAパターン
- 明確な依存関係

### リスクと対策

#### リスク
1. **学習コスト**: Java 21の新機能への習熟
2. **移行工数**: 既存コードの書き換え
3. **互換性**: 既存のインフラとの互換性

#### 対策
1. **段階的移行**: 機能ごとに段階的に移行
2. **テスト充実**: 移行前後の動作確認
3. **ドキュメント整備**: 移行手順の詳細化

## 関連ADR
なし

## 参考資料
- [Java 21 Documentation](https://docs.oracle.com/en/java/javase/21/)
- [Spring Boot 3.2 Reference](https://docs.spring.io/spring-boot/docs/3.2.0/reference/html/)
- [Spring Data JPA Reference](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/) 