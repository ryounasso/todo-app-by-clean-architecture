package com.todoapp.interfaceAdapters.repositoreies;

import com.todoapp.entities.Status;
import com.todoapp.entities.Todo;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

/**
 * TodoRepositoryの実装クラス
 * Spring Data JPAの自動実装を活用し、必要に応じてカスタムクエリを追加
 */
@Repository
public interface TodoRepositoryImpl extends TodoRepository {
    
    /**
     * ユーザーIDでTodo一覧を取得（ステータス順）
     */
    @Query("SELECT t FROM Todo t WHERE t.userId = :userId ORDER BY t.status, t.createdAt DESC")
    List<Todo> findByUserIdOrderByStatusAndCreatedAtDesc(@Param("userId") long userId);
    
    /**
     * ユーザーIDとステータスでTodo一覧を取得
     */
    List<Todo> findByUserIdAndStatus(long userId, Status status);
    
    /**
     * 指定されたIDのTodoを取得（存在しない場合はnull）
     */
    @Override
    Optional<Todo> findById(Long id);
    
    /**
     * すべてのTodoを取得
     */
    @Override
    List<Todo> findAll();
    
    /**
     * Todoを保存
     */
    @Override
    <S extends Todo> S save(S entity);
    
    /**
     * Todoを削除
     */
    @Override
    void delete(Todo entity);
    
    /**
     * 指定されたIDのTodoを削除
     */
    @Override
    void deleteById(Long id);
} 