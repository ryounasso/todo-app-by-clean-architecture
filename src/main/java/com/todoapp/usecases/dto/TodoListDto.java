package com.todoapp.usecases.dto;

import java.util.List;

public record TodoListDto(
    List<ITodoDto> todos
) {
    public TodoListDto {
        if (todos == null) {
            throw new IllegalArgumentException("todos cannot be null");
        }
    }
} 