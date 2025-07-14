package com.todoapp.interfaceAdapters.controllers;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AddTodoRequest(
    @NotNull(message = "ユーザーIDは必須です")
    Integer userId,
    
    @NotBlank(message = "タイトルは必須です")
    String title
) {} 