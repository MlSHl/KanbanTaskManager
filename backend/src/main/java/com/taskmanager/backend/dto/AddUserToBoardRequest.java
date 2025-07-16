package com.taskmanager.backend.dto;

import lombok.Data;

@Data
public class AddUserToBoardRequest {
    private String username;
    private String role;
}
