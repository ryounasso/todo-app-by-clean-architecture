package com.todoapp.usecases.dto;

public sealed interface ITodoDto extends ITodoData permits TodoDto {
    long id();
}
