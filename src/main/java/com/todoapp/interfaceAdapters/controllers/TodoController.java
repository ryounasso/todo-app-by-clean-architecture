package com.todoapp.interfaceAdapters.controllers;

import com.todoapp.usecases.service.TodoService;
import com.todoapp.usecases.dto.TodoListDto;
import com.todoapp.usecases.dto.TodoDto;
import com.todoapp.usecases.dto.AddTodoDto;
import com.todoapp.usecases.dto.TodoTitleDto;
import com.todoapp.usecases.dto.StartDto;
import com.todoapp.usecases.dto.DoneDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/list.json")
    public ResponseEntity<List<TodoDto>> getTodoList(@RequestParam Long user_id) {
        TodoListDto todoList = todoService.getTodoList(user_id);
        return ResponseEntity.ok(todoList.todos());
    }

    @PostMapping("/todo.json")
    public ResponseEntity<AddTodoResponse> addTodo(@Valid @RequestBody AddTodoRequest request) {
        AddTodoDto addTodoDto = new AddTodoDto(request.userId().longValue(), request.title());
        todoService.addTodo(addTodoDto);
        
        // 追加後のTodoを取得する必要があるが、現在のサービスはvoidを返すため
        // 一時的にレスポンスを作成
        AddTodoResponse response = new AddTodoResponse(
            null, // IDは後で取得する必要がある
            request.title(),
            "TODO"
        );
        
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/title")
    public ResponseEntity<Void> updateTitle(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTitleRequest request) {
        TodoTitleDto todoTitleDto = new TodoTitleDto(request.title());
        todoService.updateTitle(id, todoTitleDto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/start")
    public ResponseEntity<Void> start(@PathVariable Long id) {
        StartDto startDto = new StartDto(id);
        todoService.start(id, startDto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/done")
    public ResponseEntity<Void> done(@PathVariable Long id) {
        DoneDto doneDto = new DoneDto(id);
        todoService.done(id, doneDto);
        return ResponseEntity.ok().build();
    }
} 