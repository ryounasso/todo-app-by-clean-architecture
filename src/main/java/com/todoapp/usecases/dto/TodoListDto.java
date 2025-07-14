package com.todoapp.usecases.dto;

import java.util.List;

/**
 * Todo一覧表示用のDTO
 */
public record TodoListDto(
    List<TodoDto> todos
) {
    // バリデーション
    public TodoListDto {
        if (todos == null) {
            throw new IllegalArgumentException("todos cannot be null");
        }
    }
    
    /**
     * 空のTodoListDtoを作成
     */
    public static TodoListDto empty() {
        return new TodoListDto(List.of());
    }
} 