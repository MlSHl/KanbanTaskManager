package com.taskmanager.backend.service;

import com.taskmanager.backend.dto.LoginRequest;
import com.taskmanager.backend.dto.RegisterRequest;

public interface AuthService {
    String register(RegisterRequest registerRequest);
    String login(LoginRequest loginRequest);
}
