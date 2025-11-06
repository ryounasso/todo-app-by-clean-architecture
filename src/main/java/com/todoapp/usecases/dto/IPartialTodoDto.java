package com.todoapp.usecases.dto;

public sealed interface IPartialTodoDto extends ITodoData permits PartialTodoDto {
    Long id();
}
