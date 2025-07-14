package com.todoapp.interfaceAdapters.repositoreies;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * JPA設定確認用のテストリポジトリ
 */
@Repository
public interface TestRepository extends JpaRepository<TestEntity, Long> {
    
} 