package com.todoapp.usecases.dto;

import com.todoapp.entities.Status;
import java.time.LocalDateTime;

/**
 * Todo表示用のDTO
 */
public record TodoDto(
    long id,
    long userId,
    String title,
    Status status,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    LocalDateTime startedAt,
    LocalDateTime completedAt
) {
    public TodoDto {
        if (id <= 0) {
            throw new IllegalArgumentException("id must be positive");
        }
        if (userId <= 0) {
            throw new IllegalArgumentException("userId must be positive");
        }
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("title cannot be empty");
        }
        if (status == null) {
            throw new IllegalArgumentException("status cannot be null");
        }
        if (createdAt == null) {
            throw new IllegalArgumentException("createdAt cannot be null");
        }
        if (updatedAt == null) {
            throw new IllegalArgumentException("updatedAt cannot be null");
        }
        title = title.trim();
    }
} 