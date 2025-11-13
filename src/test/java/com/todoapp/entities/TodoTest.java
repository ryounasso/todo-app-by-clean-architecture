package com.todoapp.entities;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TodoTest {

    @Test
    void 生成されたTODOのステータスはREADY() {
        Todo todo = new Todo("Test Task");

        assertEquals(Status.READY, todo.getStatus());
        assertNotNull(todo.getCreatedAt());
    }

    @Test
    void Todoのタイトルを更新できる() {
        Todo todo = new Todo("Old Title");

        todo.updateTitle("New Title");

        assertEquals("New Title", todo.getTitle());
    }

    @Test
    void Todoを開始できる() {
        Todo todo = new Todo("Test Task");

        todo.start();

        assertEquals(Status.DOING, todo.getStatus());
    }

    @Test
    void Todoを完了できる() {
        Todo todo = new Todo("Test Task");

        todo.done();

        assertEquals(Status.DONE, todo.getStatus());
        assertNotNull(todo.getFinishedAt());
    }
}