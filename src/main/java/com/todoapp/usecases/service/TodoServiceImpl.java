package com.todoapp.usecases.service;

import com.todoapp.interfaceAdapters.repositories.TodoRepository;
import com.todoapp.usecases.dto.AddTodoDto;
import com.todoapp.usecases.dto.DoneDto;
import com.todoapp.usecases.dto.StartDto;
import com.todoapp.usecases.dto.TodoListDto;
import com.todoapp.usecases.dto.TodoTitleDto;
import com.todoapp.usecases.factory.TodoFactory;
import com.todoapp.entities.Todo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private final TodoFactory todoFactory;

    public TodoServiceImpl(TodoRepository todoRepository, TodoFactory todoFactory) {
        this.todoRepository = todoRepository;
        this.todoFactory = todoFactory;
    }

    @Override
    @Transactional(readOnly = true)
    public TodoListDto getTodoList(Long userId) {
        List<Todo> todos = todoRepository.findByUserId(userId);
        return todoFactory.createTodoListDto(todos);
    }

    @Override
    public void addTodo(AddTodoDto addTodoDto) {
        Todo todo = todoFactory.createTodo(addTodoDto);
        todoRepository.save(todo);
    }

    @Override
    public void updateTitle(Long todoId, TodoTitleDto todoTitleDto) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + todoId));
        
        todo.updateTitle(todoTitleDto.title());
        todoRepository.save(todo);
    }

    @Override
    public void start(Long todoId, StartDto startDto) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + todoId));
        
        todo.start();
        todoRepository.save(todo);
    }

    @Override
    public void done(Long todoId, DoneDto doneDto) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + todoId));
        
        todo.done();
        todoRepository.save(todo);
    }
} 