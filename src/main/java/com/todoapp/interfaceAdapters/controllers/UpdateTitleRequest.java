package com.todoapp.interfaceAdapters.controllers;

import jakarta.validation.constraints.NotBlank;

public record UpdateTitleRequest(
    @NotBlank(message = "タイトルは必須です")
    String title
) {} 