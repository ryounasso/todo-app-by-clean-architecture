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

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class TodoRepositoryTest {

    @Autowired
    private TodoRepository todoRepository;

    private TodoFactory todoFactory = new TodoFactoryImpl();

    @Test
    void 追加したTODO単体を取得できる() {
        Todo todo = todoFactory.createTodo(new AddTodoDto("テストタスク"));

        Todo savedTodo = todoRepository.save(todo);
        Optional<Todo> foundTodo = todoRepository.findById(savedTodo.getId());

        assertThat(foundTodo).isPresent();
        assertThat(foundTodo.get().getTitle()).isEqualTo("テストタスク");
        assertThat(foundTodo.get().getStatus()).isEqualTo(Status.READY);
    }

    @Test
    void 複数のTODOを取得できる() {
        Todo todo1 = todoFactory.createTodo(new AddTodoDto("タスク1"));
        Todo todo2 = todoFactory.createTodo(new AddTodoDto("タスク2"));
        todoRepository.save(todo1);
        todoRepository.save(todo2);

        List<Todo> todos = todoRepository.findTodoList();

        assertThat(todos).hasSize(2);
        assertThat(todos).extracting(Todo::getTitle).containsExactlyInAnyOrder("タスク1", "タスク2");
    }

    @Test
    void TODOのタイトルを更新できる() {
        Todo todo = todoFactory.createTodo(new AddTodoDto("旧タイトル"));
        Todo savedTodo = todoRepository.save(todo);

        savedTodo.updateTitle("新タイトル");
        todoRepository.save(savedTodo);

        Optional<Todo> updatedTodo = todoRepository.findById(savedTodo.getId());
        assertThat(updatedTodo.get().getTitle()).isEqualTo("新タイトル");
    }
}
