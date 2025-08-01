package com.todoapp.infrastructure.persistence.repository;

import com.todoapp.entities.Status;
import com.todoapp.entities.Todo;
import com.todoapp.interfaceAdapters.repositories.TodoRepositoryImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * TodoRepositoryImplのテストクラス
 */
@DataJpaTest
@ActiveProfiles("test")
public class TodoRepositoryTest {

    @Autowired
    private TodoRepositoryImpl todoRepository;

    @Test
    void testSaveAndFindById() {
        // Given
        Todo todo = new Todo(1L, "テストタスク");

        // When
        Todo savedTodo = todoRepository.save(todo);
        Optional<Todo> foundTodo = todoRepository.findById(savedTodo.getId());

        // Then
        assertThat(foundTodo).isPresent();
        assertThat(foundTodo.get().getTitle()).isEqualTo("テストタスク");
        assertThat(foundTodo.get().getUserId()).isEqualTo(1L);
        assertThat(foundTodo.get().getStatus()).isEqualTo(Status.TODO);
    }

    @Test
    void testFindByUserId() {
        // Given
        Todo todo1 = new Todo(1L, "ユーザー1のタスク1");

        Todo todo2 = new Todo(1L, "ユーザー1のタスク2");
        todo2.start(); // IN_PROGRESSに変更

        Todo todo3 = new Todo(2L, "ユーザー2のタスク");

        todoRepository.save(todo1);
        todoRepository.save(todo2);
        todoRepository.save(todo3);

        // When
        List<Todo> user1Todos = todoRepository.findByUserId(1L);
        List<Todo> user2Todos = todoRepository.findByUserId(2L);

        // Then
        assertThat(user1Todos).hasSize(2);
        assertThat(user2Todos).hasSize(1);
    }

    @Test
    void testFindByUserIdAndStatus() {
        // Given
        Todo todo1 = new Todo(1L, "TODOタスク");

        Todo todo2 = new Todo(1L, "進行中タスク");
        todo2.start(); // IN_PROGRESSに変更

        todoRepository.save(todo1);
        todoRepository.save(todo2);

        // When
        List<Todo> todoStatusTodos = todoRepository.findByUserIdAndStatus(1L, Status.TODO);
        List<Todo> inProgressTodos = todoRepository.findByUserIdAndStatus(1L, Status.IN_PROGRESS);

        // Then
        assertThat(todoStatusTodos).hasSize(1);
        assertThat(todoStatusTodos.get(0).getTitle()).isEqualTo("TODOタスク");
        assertThat(inProgressTodos).hasSize(1);
        assertThat(inProgressTodos.get(0).getTitle()).isEqualTo("進行中タスク");
    }

    @Test
    void testDelete() {
        // Given
        Todo todo = new Todo(1L, "削除対象タスク");

        Todo savedTodo = todoRepository.save(todo);
        assertThat(todoRepository.findById(savedTodo.getId())).isPresent();

        // When
        todoRepository.deleteById(savedTodo.getId());

        // Then
        assertThat(todoRepository.findById(savedTodo.getId())).isEmpty();
    }
} 