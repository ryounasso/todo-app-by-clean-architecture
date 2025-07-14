package com.todoapp.application.dto;

/**
 * Todoタイトル更新用のDTO
 */
public record TodoTitleDto(
    String title
) {
    // バリデーション
    public TodoTitleDto {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("title cannot be empty");
        }
        title = title.trim();
    }
} 