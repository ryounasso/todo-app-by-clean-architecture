package com.todoapp.interfaceAdapters.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * ヘルスチェック用コントローラー
 */
@RestController
public class HealthController {

    /**
     * ヘルスチェックエンドポイント
     * @return アプリケーションの状態
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", System.currentTimeMillis());
        response.put("application", "todo-app");
        response.put("version", "1.0.0");
        
        return ResponseEntity.ok(response);
    }

    /**
     * 詳細ヘルスチェックエンドポイント
     * @return 詳細なアプリケーションの状態
     */
    @GetMapping("/health/detailed")
    public ResponseEntity<Map<String, Object>> detailedHealth() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", System.currentTimeMillis());
        response.put("application", "todo-app");
        response.put("version", "1.0.0");
        response.put("java.version", System.getProperty("java.version"));
        response.put("java.vendor", System.getProperty("java.vendor"));
        response.put("os.name", System.getProperty("os.name"));
        response.put("os.version", System.getProperty("os.version"));
        
        return ResponseEntity.ok(response);
    }
} 