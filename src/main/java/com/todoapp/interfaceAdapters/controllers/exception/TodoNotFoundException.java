package com.todoapp.interfaceAdapters.controllers.exception;

public class TodoNotFoundException extends RuntimeException {
    
    public TodoNotFoundException(String message) {
        super(message);
    }
    
    public TodoNotFoundException(Long todoId) {
        super("Todo with id " + todoId + " not found");
    }
} 