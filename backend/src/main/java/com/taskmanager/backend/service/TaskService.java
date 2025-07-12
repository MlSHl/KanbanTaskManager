package com.taskmanager.backend.service;

import com.taskmanager.backend.dto.TaskDTO;
import com.taskmanager.backend.entity.Task;

import java.util.List;

public interface TaskService {
    List<TaskDTO> getTasks();
    TaskDTO createTask(Task task);
    TaskDTO updateTask(Long id, Task task);
}
