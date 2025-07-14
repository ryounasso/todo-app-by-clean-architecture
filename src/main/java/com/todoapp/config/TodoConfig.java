package com.todoapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Todoアプリケーションの設定クラス
 * コンポーネントスキャン、JPA、トランザクション管理の設定
 */
@Configuration
@ComponentScan(basePackages = "com.todoapp")
@EnableJpaRepositories(basePackages = "com.todoapp.infrastructure.persistence.repository")
@EnableTransactionManagement
public class TodoConfig {
    
    // 必要に応じてBean定義を追加
    // 例: データソース、JPA設定、セキュリティ設定など
    
} 