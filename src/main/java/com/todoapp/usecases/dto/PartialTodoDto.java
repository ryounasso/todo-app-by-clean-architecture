package com.todoapp.usecases.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.todoapp.entities.Status;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record PartialTodoDto(
    Long id,
    String title,
    Status status,
    LocalDateTime createdAt,
    LocalDateTime finishedAt
) implements IPartialTodoDto {}