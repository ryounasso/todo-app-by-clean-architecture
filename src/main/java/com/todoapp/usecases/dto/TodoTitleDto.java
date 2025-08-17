package com.todoapp.usecases.dto;

public record TodoTitleDto(
    long id,
    String title
) {
    public TodoTitleDto {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("title cannot be empty");
        }
    }
} 