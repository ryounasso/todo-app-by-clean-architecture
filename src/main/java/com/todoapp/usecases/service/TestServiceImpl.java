package com.todoapp.usecases.service;

import org.springframework.stereotype.Service;
import com.todoapp.interfaceAdapters.repositoreies.TestRepository;

/**
 * コンストラクタインジェクション確認用のテストサービス実装
 */
@Service
public class TestServiceImpl implements TestService {
    
    private final TestRepository testRepository;
    
    // コンストラクタインジェクション
    public TestServiceImpl(TestRepository testRepository) {
        this.testRepository = testRepository;
    }
    
    @Override
    public String getTestMessage() {
        return "TestService is working! Repository count: " + testRepository.count();
    }
    
} 