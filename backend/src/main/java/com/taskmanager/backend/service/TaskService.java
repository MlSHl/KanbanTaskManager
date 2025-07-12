package com.taskmanager.backend.service;

import com.taskmanager.backend.dto.TaskDTO;
import com.taskmanager.backend.entity.Task;

public interface TaskService {
    TaskDTO createTask(Task task);
    TaskDTO updateTask(Long id, Task task);
}
