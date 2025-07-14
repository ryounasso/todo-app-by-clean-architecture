package com.todoapp.application.dto;

/**
 * Todo完了用のDTO
 */
public record DoneDto(
    long todoId
) {
    // バリデーション
    public DoneDto {
        if (todoId <= 0) {
            throw new IllegalArgumentException("todoId must be positive");
        }
    }
} 