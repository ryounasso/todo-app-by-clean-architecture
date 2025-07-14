package com.todoapp.interfaceAdapters.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.todoapp.usecases.service.TestService;

/**
 * DI確認用のテストコントローラー
 */
@RestController
public class TestController {
    
    private final TestService testService;
    
    // コンストラクタインジェクション
    public TestController(TestService testService) {
        this.testService = testService;
    }
    
    @GetMapping("/test")
    public String test() {
        return testService.getTestMessage();
    }
    
} 