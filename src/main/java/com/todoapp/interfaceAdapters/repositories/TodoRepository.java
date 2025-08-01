package com.todoapp.interfaceAdapters.repositories;

import com.todoapp.entities.Todo;
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