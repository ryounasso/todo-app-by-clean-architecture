package com.todoapp.usecases.service;

import com.todoapp.usecases.dto.AddTodoDto;
import com.todoapp.usecases.dto.DoneDto;
import com.todoapp.usecases.dto.StartDto;
import com.todoapp.usecases.dto.TodoListDto;
import com.todoapp.usecases.dto.TodoTitleDto;

public interface TodoService {
    TodoListDto getTodoList(Long userId);
    void addTodo(AddTodoDto addTodoDto);
    void updateTitle(Long todoId, TodoTitleDto todoTitleDto);
    void start(Long todoId, StartDto startDto);
    void done(Long todoId, DoneDto doneDto);
} 