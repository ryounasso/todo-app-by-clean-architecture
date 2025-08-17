package com.todoapp.interfaceAdapters.repositories;

import com.todoapp.entities.Todo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface TodoRepository extends CrudRepository<Todo, Long> {
    @Query("SELECT t FROM Todo t WHERE t.id = :id")
    Optional<Todo> findById(long id);

    @Query("SELECT t FROM Todo t ORDER BY t.status, t.createdAt DESC")
    List<Todo> findTodoList();
} 