package com.todoapp.usecases.service;

import com.todoapp.config.TodoConfig;
import com.todoapp.entities.Status;
import com.todoapp.entities.Todo;
import com.todoapp.usecases.dto.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {TodoConfig.class})
@Transactional
class TodoServiceTest {
    @Autowired
    private TodoService sut;

    @Test
    void 追加したTODOを取得できる() {
        sut.addTodo(new AddTodoDto("テストタスク"));

        TodoListDto todoList = sut.getTodoList(false, Optional.empty());
        String actualTitle = todoList.todos().getFirst().title();
        assertThat(actualTitle).isEqualTo("テストタスク");
    }

    @Test
    void TODOの情報を部分的に取得できる() {
        Todo addedTodo = sut.addTodo(new AddTodoDto("部分取得テスト"));

        TodoListDto todoList = sut.getTodoList(false, Optional.of("id,title"));
        PartialTodoDto todoData = (PartialTodoDto) todoList.todos().getFirst();
        assertThat(todoData.id()).isEqualTo(addedTodo.getId());
        assertThat(todoData.title()).isEqualTo("部分取得テスト");
        assertThat(todoData.status()).isNull();
        assertThat(todoData.createdAt()).isNull();
        assertThat(todoData.finishedAt()).isNull();
    }

    @Test
    void 完了したTODOを除外して取得できる() {
        Todo todo1 = sut.addTodo(new AddTodoDto("タスク1"));
        sut.addTodo(new AddTodoDto("タスク2"));

        sut.done(new DoneDto(todo1.getId()));

        TodoListDto todoList = sut.getTodoList(true, Optional.empty());
        assertThat(todoList.todos()).hasSize(1);
        String actualTitle = todoList.todos().getFirst().title();
        assertThat(actualTitle).isEqualTo("タスク2");
    }

    @Test
    void TODOがない場合は空のリストを取得できる() {
        TodoListDto todoList = sut.getTodoList(false, Optional.empty());
        assertThat(todoList.todos()).isEmpty();
    }

    @Test
    void TODOのタイトルを更新できる() {
        Todo todo = sut.addTodo(new AddTodoDto("古いタイトル"));

        sut.updateTitle(new TodoTitleDto(todo.getId(), "新しいタイトル"));

        TodoListDto todoList = sut.getTodoList(false, Optional.empty());
        String actualTitle = todoList.todos().getFirst().title();
        assertThat(actualTitle).isEqualTo("新しいタイトル");
    }

    @Test
    void TODOを開始できる() {
        Todo todo = sut.addTodo(new AddTodoDto("開始テスト"));

        sut.start(new StartDto(todo.getId()));

        TodoListDto todoList = sut.getTodoList(false, Optional.empty());
        Status actualStatus = todoList.todos().getFirst().status();
        assertThat(actualStatus).isEqualTo(Status.DOING);
    }

    @Test
    void 開始したTODOを完了できる() {
        Todo todo = sut.addTodo(new AddTodoDto("完了テスト"));
        long targetTodoId = todo.getId();
        sut.start(new StartDto(targetTodoId));

        sut.done(new DoneDto(targetTodoId));

        TodoListDto todoList = sut.getTodoList(false, Optional.empty());
        Status actualStatus = todoList.todos().getFirst().status();
        assertThat(actualStatus).isEqualTo(Status.DONE);
    }

    @Test
    void 追加したTODOを完了できる() {
        Todo todo = sut.addTodo(new AddTodoDto("完了テスト"));

        sut.done(new DoneDto(todo.getId()));

        TodoListDto todoList = sut.getTodoList(false, Optional.empty());
        Status actualStatus = todoList.todos().getFirst().status();
        assertThat(actualStatus).isEqualTo(Status.DONE);
    }
}