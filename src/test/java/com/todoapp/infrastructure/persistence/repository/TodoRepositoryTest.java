package com.todoapp.infrastructure.persistence.repository;

import com.todoapp.entities.Status;
import com.todoapp.entities.Todo;
import com.todoapp.interfaceAdapters.repositories.TodoRepository;
import com.todoapp.usecases.dto.AddTodoDto;
import com.todoapp.usecases.factory.TodoFactory;
import com.todoapp.usecases.factory.TodoFactoryImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class TodoRepositoryTest {

    @Autowired
    private TodoRepository todoRepository;

    private TodoFactory todoFactory = new TodoFactoryImpl();

    @Test
    void testSaveAndFindById() {
        // Given
        Todo todo = todoFactory.createTodo(new AddTodoDto("テストタスク"));

        // When
        Todo savedTodo = todoRepository.save(todo);
        Optional<Todo> foundTodo = todoRepository.findById(savedTodo.getId());

        // Then
        assertThat(foundTodo).isPresent();
        assertThat(foundTodo.get().getTitle()).isEqualTo("テストタスク");
        assertThat(foundTodo.get().getStatus()).isEqualTo(Status.READY);
    }
}
