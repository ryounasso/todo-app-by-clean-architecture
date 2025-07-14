package com.todoapp.domain.repository;

import com.todoapp.domain.entity.Todo;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

/**
 * Todoエンティティのリポジトリインターフェース
 */
public interface TodoRepository extends CrudRepository<Todo, Long> {
    /**
     * ユーザーIDでTodo一覧を取得
     */
    List<Todo> findByUserId(long userId);
} 