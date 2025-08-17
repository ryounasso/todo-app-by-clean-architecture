package com.todoapp.usecases.factory;

import com.todoapp.usecases.dto.*;
import com.todoapp.entities.Todo;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class TodoFactoryImpl implements TodoFactory {

    @Override
    public Todo createTodo(AddTodoDto addTodoDto) {
        return new Todo(
                addTodoDto.title()
        );
    }

    @Override
    public TodoDto createTodoDto(Todo todo) {
        return new TodoDto(
                todo.getId(),
                todo.getTitle(),
                todo.getStatus(),
                todo.getCreatedAt(),
                null
        );
    }

    @Override
    public PartialTodoDto createPartialTodoDto(Todo todo, String[] fields) {
        List<String> fieldList = Arrays.asList(fields);

        return new PartialTodoDto(
                fieldList.contains("id") ? todo.getId() : null,
                fieldList.contains("title") ? todo.getTitle() : null,
                fieldList.contains("status") ? todo.getStatus() : null,
                fieldList.contains("createdAt") ? todo.getCreatedAt() : null,
                fieldList.contains("finishedAt") ? todo.getFinishedAt() : null
        );
    }

    @Override
    public TodoListDto createTodoListDto(List<Todo> todos) {
        List<ITodoDto> todoDtos = todos.stream()
                .map(this::createTodoDto)
                .map(ITodoDto.class::cast)
                .toList();
        
        return new TodoListDto(todoDtos);
    }
} 