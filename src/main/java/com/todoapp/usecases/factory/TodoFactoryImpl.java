package com.todoapp.usecases.factory;

import com.todoapp.usecases.dto.AddTodoDto;
import com.todoapp.usecases.dto.TodoDto;
import com.todoapp.usecases.dto.TodoListDto;
import com.todoapp.domain.entity.Status;
import com.todoapp.domain.entity.Todo;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TodoFactoryImpl implements TodoFactory {

    @Override
    public Todo createTodo(AddTodoDto addTodoDto) {
        return new Todo(
                addTodoDto.userId(),
                addTodoDto.title()
        );
    }

    @Override
    public TodoDto createTodoDto(Todo todo) {
        return new TodoDto(
                todo.getId(),
                todo.getUserId(),
                todo.getTitle(),
                todo.getStatus(),
                todo.getCreatedAt(),
                todo.getUpdatedAt(),
                todo.getStartedAt(),
                todo.getCompletedAt()
        );
    }

    @Override
    public TodoListDto createTodoListDto(List<Todo> todos) {
        List<TodoDto> todoDtos = todos.stream()
                .map(this::createTodoDto)
                .collect(Collectors.toList());
        
        return new TodoListDto(todoDtos);
    }
} 