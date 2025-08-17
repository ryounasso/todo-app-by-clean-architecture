package com.todoapp.usecases.service;

import com.todoapp.entities.Todo;
import com.todoapp.usecases.dto.AddTodoDto;
import com.todoapp.usecases.dto.DoneDto;
import com.todoapp.usecases.dto.StartDto;
import com.todoapp.usecases.dto.TodoListDto;
import com.todoapp.usecases.dto.TodoTitleDto;

import java.util.Optional;

public interface TodoService {
    TodoListDto getTodoList(boolean exclude_done_todo, Optional<String> fields);

    Todo addTodo(AddTodoDto addTodoDto);

    void updateTitle(TodoTitleDto todoTitleDto);

    void start(StartDto startDto);

    void done(DoneDto doneDto);
} 