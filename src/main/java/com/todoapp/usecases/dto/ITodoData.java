package com.todoapp.usecases.dto;

import com.todoapp.entities.Status;

import java.time.LocalDateTime;

public sealed interface ITodoData permits ITodoDto, IPartialTodoDto {
    String title();
    Status status();
    LocalDateTime createdAt();
    LocalDateTime finishedAt();
}
