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
@EnableJpaRepositories(basePackages = "com.todoapp.interfaceAdapters.repositories")
@EnableTransactionManagement
public class TodoConfig {    
} 