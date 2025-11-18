package com.todoapp.usecases.service;

import com.todoapp.entities.Todo;
import com.todoapp.usecases.dto.*;

import java.util.Optional;

public interface TodoService {
    TodoListDto getTodoList(boolean exclude_done_todo, Optional<String> fields);

    TodoDto addTodo(AddTodoDto addTodoDto);

    void updateTitle(TodoTitleDto todoTitleDto);

    void start(StartDto startDto);

    void done(DoneDto doneDto);
} 