package com.todoapp.infrastructure.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.todoapp.domain.entity.TestEntity;

/**
 * JPA設定確認用のテストリポジトリ
 */
@Repository
public interface TestRepository extends JpaRepository<TestEntity, Long> {
    
} 