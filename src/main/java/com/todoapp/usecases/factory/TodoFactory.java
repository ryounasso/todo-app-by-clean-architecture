package com.todoapp.usecases.factory;

import com.todoapp.usecases.dto.AddTodoDto;
import com.todoapp.usecases.dto.TodoDto;
import com.todoapp.usecases.dto.TodoListDto;
import com.todoapp.entities.Todo;

import java.util.List;

public interface TodoFactory {
    Todo createTodo(AddTodoDto addTodoDto);
    TodoDto createTodoDto(Todo todo);
    TodoListDto createTodoListDto(List<Todo> todos);
} 