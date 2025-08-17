package com.todoapp.usecases.dto;

public sealed interface ITodoDto permits TodoDto, PartialTodoDto {
}
