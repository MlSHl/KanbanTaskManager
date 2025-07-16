package com.taskmanager.backend.service.impl;

import com.taskmanager.backend.dto.UserDTO;
import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.repository.UserRepository;
import com.taskmanager.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<UserDTO> getUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::userToDTO).collect(Collectors.toList());
    }


    private UserDTO userToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
    }
}
