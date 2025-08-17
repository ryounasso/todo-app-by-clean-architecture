package com.todoapp.interfaceAdapters.controllers;

public record AddTodoResponse(
    Long id,
    String title,
    String status
) {} 