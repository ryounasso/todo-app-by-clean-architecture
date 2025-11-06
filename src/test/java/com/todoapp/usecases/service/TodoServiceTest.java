package com.todoapp.usecases.service;

import com.todoapp.config.TodoConfig;
import com.todoapp.usecases.dto.AddTodoDto;
import com.todoapp.usecases.dto.TodoListDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {TodoConfig.class})
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
}