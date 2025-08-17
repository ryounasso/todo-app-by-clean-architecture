package com.todoapp.usecases.service;

import com.todoapp.entities.Status;
import com.todoapp.interfaceAdapters.repositories.TodoRepository;
import com.todoapp.usecases.dto.*;
import com.todoapp.usecases.factory.TodoFactory;
import com.todoapp.entities.Todo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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
    public TodoListDto getTodoList(boolean exclude_done_todo, Optional<String> fields) {
        List<Todo> result = todoRepository.findTodoList();

        if (exclude_done_todo) {
            result = result.stream().filter(t -> !t.getStatus().equals(Status.DONE)).toList();
        }

        if (fields.isPresent()) {
            String[] fieldArray = fields.orElse("id,title,status,createdAt,finishedAt").split(",");

            List<ITodoDto> todoDtoList = result.stream()
                    .map(t -> (ITodoDto) todoFactory.createPartialTodoDto(t, fieldArray))
                    .toList();

            return new TodoListDto(todoDtoList);
        }

        return todoFactory.createTodoListDto(result);
    }

    @Override
    public Todo addTodo(AddTodoDto addTodoDto) {
        Todo todo = todoFactory.createTodo(addTodoDto);
        return todoRepository.save(todo);
    }

    @Override
    public void updateTitle(TodoTitleDto todoTitleDto) {
        Todo todo = todoRepository.findById(todoTitleDto.id());
        
        todo.updateTitle(todoTitleDto.title());
        todoRepository.save(todo);
    }

    @Override
    public void start(StartDto startDto) {
        Todo todo = todoRepository.findById(startDto.todoId());
        
        todo.start();
        todoRepository.save(todo);
    }

    @Override
    public void done(DoneDto doneDto) {
        Todo todo = todoRepository.findById(doneDto.todoId());
        
        todo.done();
        todoRepository.save(todo);
    }
} 