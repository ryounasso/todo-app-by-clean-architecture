package com.todoapp.entities;

public enum Status {
    READY("ready"),
    DOING("doing"),
    DONE("done");

    private final String displayName;

    Status(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
} 