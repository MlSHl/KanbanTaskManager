package com.taskmanager.backend.service.impl;

import com.taskmanager.backend.dto.LoginRequest;
import com.taskmanager.backend.dto.RegisterRequest;
import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.enums.Role;
import com.taskmanager.backend.repository.UserRepository;
import com.taskmanager.backend.service.AuthService;
import com.taskmanager.backend.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    @Override
    public String register(RegisterRequest registerRequest) {
        Role role = Role.valueOf(registerRequest.getRole());
        User user = User.builder()
                .email(registerRequest.getEmail())
                .username(registerRequest.getUsername())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(role)
                .build();

        userRepository.save(user);

        return jwtService.generateToken(user);
    }

    @Override
    public String login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new UsernameNotFoundException("Username not found"));
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new IllegalArgumentException("Wrong Password");
        }
        return jwtService.generateToken(user);
    }
}
