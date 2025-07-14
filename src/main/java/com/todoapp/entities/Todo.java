package com.todoapp.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Todoエンティティ
 */
@Entity
@Table(name = "todos")
public class Todo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "title", nullable = false, length = 255)
    private String title;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status = Status.TODO;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @Column(name = "started_at")
    private LocalDateTime startedAt;
    
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
    
    // コンストラクタ
    public Todo() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Todo(Long userId, String title) {
        this();
        this.userId = userId;
        this.title = title;
    }
    
    // ビジネスロジックメソッド
    public void updateTitle(String newTitle) {
        this.title = newTitle;
        this.updatedAt = LocalDateTime.now();
    }
    
    public void start() {
        if (this.status == Status.TODO) {
            this.status = Status.IN_PROGRESS;
            this.startedAt = LocalDateTime.now();
            this.updatedAt = LocalDateTime.now();
        }
    }
    
    public void done() {
        if (this.status == Status.IN_PROGRESS) {
            this.status = Status.DONE;
            this.completedAt = LocalDateTime.now();
            this.updatedAt = LocalDateTime.now();
        }
    }
    
    // ゲッターメソッド
    public Long getId() {
        return id;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public String getTitle() {
        return title;
    }
    
    public Status getStatus() {
        return status;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public LocalDateTime getStartedAt() {
        return startedAt;
    }
    
    public LocalDateTime getCompletedAt() {
        return completedAt;
    }
} 