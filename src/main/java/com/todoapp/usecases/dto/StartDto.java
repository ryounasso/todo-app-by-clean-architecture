package com.todoapp.usecases.dto;

/**
 * Todo開始用のDTO
 */
public record StartDto(
    long todoId
) {
    public StartDto {
        if (todoId <= 0) {
            throw new IllegalArgumentException("todoId must be positive");
        }
    }
} 