package com.todoapp.usecases.dto;

import com.todoapp.entities.Status;
import java.time.LocalDateTime;

public record TodoDto(
    long id,
    String title,
    Status status,
    LocalDateTime createdAt,
    LocalDateTime finishedAt
) implements ITodoDto {}