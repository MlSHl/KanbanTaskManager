package com.taskmanager.backend.controller;

import com.taskmanager.backend.dto.TaskDTO;
import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/task")
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/addTask")
    public ResponseEntity<TaskDTO> addTask(@RequestBody Task task) {
        TaskDTO createdTask = taskService.createTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<TaskDTO> updateTask(@RequestBody Task task) {
        TaskDTO updatedTask = taskService.updateTask(task);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }
}
