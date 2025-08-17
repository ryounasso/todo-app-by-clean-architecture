package com.todoapp.interfaceAdapters.controllers;

import com.todoapp.entities.Todo;
import com.todoapp.usecases.dto.AddTodoDto;
import com.todoapp.usecases.dto.DoneDto;
import com.todoapp.usecases.dto.StartDto;
import com.todoapp.usecases.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostController {

    private final TodoService todoService;

    public PostController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping("/todo.json")
    public ResponseEntity<AddTodoResponse> addTodo(@Valid @RequestBody AddTodoRequest request) {
        AddTodoDto addTodoDto = new AddTodoDto(request.title());
        Todo addedTodo = todoService.addTodo(addTodoDto);

        AddTodoResponse response = new AddTodoResponse(
                addedTodo.getId(),
                addedTodo.getTitle(),
                addedTodo.getStatus().getDisplayName()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/todo/start.json")
    public ResponseEntity<Void> start(@RequestBody StartForm startForm) {
        StartDto startDto = new StartDto(Long.parseLong(startForm.id()));
        todoService.start(startDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/todo/done.json")
    public ResponseEntity<Void> done(@RequestBody DoneForm doneForm) {
        DoneDto doneDto = new DoneDto(Long.parseLong(doneForm.id()));
        todoService.done(doneDto);
        return ResponseEntity.ok().build();
    }
}
