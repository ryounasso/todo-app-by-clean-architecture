package com.todoapp.usecases.dto;

public record DoneDto(
    long todoId
) {
    public DoneDto {
        if (todoId <= 0) {
            throw new IllegalArgumentException("todoId must be positive");
        }
    }
} 