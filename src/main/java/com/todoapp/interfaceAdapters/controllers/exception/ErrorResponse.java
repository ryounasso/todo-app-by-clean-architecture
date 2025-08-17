package com.todoapp.interfaceAdapters.controllers.exception;

import java.time.LocalDateTime;

public record ErrorResponse(
    String message,
    String error,
    int status,
    LocalDateTime timestamp
) {
    public ErrorResponse(String message, String error, int status) {
        this(message, error, status, LocalDateTime.now());
    }
} 