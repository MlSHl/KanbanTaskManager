package com.taskmanager.backend.controller;

import com.taskmanager.backend.dto.TaskDTO;
import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.exception.MismatchedTaskIdException;
import com.taskmanager.backend.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    @PostMapping()
    public ResponseEntity<TaskDTO> addTask(@RequestBody Task task) {
        TaskDTO createdTask = taskService.createTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id, @RequestBody Task task) {
        if (!task.getId().equals(id)) {
            throw new MismatchedTaskIdException("Task ID in path and body must match.");
        }
        TaskDTO updatedTask = taskService.updateTask(id, task);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }
}
