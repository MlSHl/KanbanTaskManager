package com.taskmanager.backend.service;


import com.taskmanager.backend.dto.UserDTO;

import java.util.List;

public interface UserService {
    List<UserDTO> getUsers();
}
