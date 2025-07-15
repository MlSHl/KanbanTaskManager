package com.taskmanager.backend.dto;

import lombok.Data;

@Data
public class LoginRequest {
    String username;
    String password;
}
