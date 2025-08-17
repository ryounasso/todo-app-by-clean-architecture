package com.todoapp.interfaceAdapters.controllers;

import com.todoapp.usecases.dto.TodoTitleDto;
import com.todoapp.usecases.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/todo")
public class PutController {

    private final TodoService todoService;

    public PutController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PutMapping("/title.json")
    public ResponseEntity<Void> updateTitle(
            @Valid @RequestBody UpdateTitleRequest request) {
        TodoTitleDto todoTitleDto = new TodoTitleDto(Long.parseLong(request.todoId()), request.title());
        todoService.updateTitle(todoTitleDto);
        return ResponseEntity.ok().build();
    }
}
