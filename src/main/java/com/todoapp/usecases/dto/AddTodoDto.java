package com.todoapp.usecases.dto;

public record AddTodoDto(
    String title
) {
    public AddTodoDto {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("title cannot be empty");
        }
    }
} 