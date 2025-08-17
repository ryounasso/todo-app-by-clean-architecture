package com.todoapp.interfaceAdapters.controllers;

import jakarta.validation.constraints.NotBlank;

public record UpdateTitleRequest(
    @NotBlank(message = "Todo Id は必須です")
    String todoId,

    @NotBlank(message = "タイトルは必須です")
    String title
) {} 