package com.todoapp.entities;

/**
 * Todoのステータスを表すenum
 */
public enum Status {
    TODO("未着手"),
    IN_PROGRESS("進行中"),
    DONE("完了");

    private final String displayName;

    Status(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
} 