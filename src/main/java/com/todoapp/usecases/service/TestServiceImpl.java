package com.todoapp.usecases.service;

import com.todoapp.interfaceAdapters.repositories.TestRepository;
import org.springframework.stereotype.Service;

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