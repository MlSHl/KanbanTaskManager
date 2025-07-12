package com.taskmanager.backend.service.impl;

import com.taskmanager.backend.dto.TaskDTO;
import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.exception.ResourceNotFoundException;
import com.taskmanager.backend.repository.TaskRepository;
import com.taskmanager.backend.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;

    @Override
    public TaskDTO createTask(Task task) {
        taskRepository.save(task);
        return TaskDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .status(task.getStatus())
                .description(task.getDescription())
                .build();
    }

    @Override
    public TaskDTO updateTask(Task task) {
        if(taskRepository.findById(task.getId()).isPresent()) {
            taskRepository.save(task);
        }else{
            throw new ResourceNotFoundException("Task with ID " + task.getId() + " not found.");
        }

        return TaskDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .status(task.getStatus())
                .description(task.getDescription())
                .build();
    }
}
