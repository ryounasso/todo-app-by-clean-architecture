# Phase 1.1 作業ログ

## 実施内容
- Spring Boot CLI（v3.5.3）がインストールされていることを確認。
- `spring init`コマンドでJava 21/Spring Boot 3.5.3/Gradleプロジェクト（依存: web, data-jpa, validation, postgresql, パッケージ: com.todoapp）を生成。
- 生成された`todo-app`ディレクトリの中身をプロジェクトルートに移動。
- 既存のTypeScript/NestJS用`src`ディレクトリは`src-typescript-backup`としてバックアップ。

## 確認事項
- Spring Boot CLIが正しくインストールされていることを確認。
- Gradleビルド、Java 21、Spring Boot 3.5.3、必要な依存関係が正しく設定されていることを確認。
- `com.todoapp`パッケージ配下に`DemoApplication.java`が生成されていることを確認。
- 生成されたファイル・ディレクトリ構成が正しいことを確認。
- 既存のTypeScript/NestJS資産も安全にバックアップされていることを確認。 