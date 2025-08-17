package com.todoapp.interfaceAdapters.controllers;

import com.todoapp.usecases.dto.ITodoDto;
import com.todoapp.usecases.service.TodoService;
import com.todoapp.usecases.dto.TodoListDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todo")
public class GetController {

    private final TodoService todoService;

    public GetController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/list.json")
    public ResponseEntity<List<ITodoDto>> getTodoList(@RequestParam(value = "exclude_done_todo") boolean excludeDoneTodo, @RequestParam Optional<String> fields) {
        TodoListDto todoList = todoService.getTodoList(excludeDoneTodo, fields);
        return ResponseEntity.ok(todoList.todos());
    }
} 