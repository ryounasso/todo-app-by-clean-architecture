package com.todoapp.entities;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "todos")
public class Todo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "finished_at")
    private LocalDateTime finishedAt;
    
    public Todo() {
        this.status = Status.READY;
        this.createdAt = LocalDateTime.now();
    }
    
    public Todo(String title) {
        this();
        this.title = title;
    }
    
    public void updateTitle(String newTitle) {
        this.title = newTitle;
    }
    
    public void start() {
        if (this.status == Status.READY) {
            this.status = Status.DOING;
        }
    }
    
    public void done() {
        this.status = Status.DONE;
    }
}