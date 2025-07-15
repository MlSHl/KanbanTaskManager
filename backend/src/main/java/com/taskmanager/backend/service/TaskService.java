package com.taskmanager.backend.service;

import com.taskmanager.backend.dto.ReorderRequest;
import com.taskmanager.backend.dto.TaskDTO;
import com.taskmanager.backend.entity.Task;

import java.util.List;

public interface TaskService {
    TaskDTO findTaskById(Long id);
    List<TaskDTO> getTasks(Long boardId);
    TaskDTO createTask(Task task);
    TaskDTO updateTask(Long id, Task task);
    void deleteTask(Long id);
    void reorderTasks(ReorderRequest request, Long taskId);
}
