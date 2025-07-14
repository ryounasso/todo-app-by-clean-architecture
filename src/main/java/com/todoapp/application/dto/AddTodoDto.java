package com.todoapp.application.dto;

/**
 * Todo追加用のDTO
 */
public record AddTodoDto(
    long userId,
    String title
) {
    public AddTodoDto {
        if (userId <= 0) {
            throw new IllegalArgumentException("userId must be positive");
        }
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("title cannot be empty");
        }
        title = title.trim();
    }
} 