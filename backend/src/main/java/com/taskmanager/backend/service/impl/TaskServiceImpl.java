package com.taskmanager.backend.service.impl;

import com.taskmanager.backend.dto.ReorderRequest;
import com.taskmanager.backend.dto.TaskDTO;
import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.exception.ResourceNotFoundException;
import com.taskmanager.backend.jdbc.TaskJDBCRepository;
import com.taskmanager.backend.repository.TaskRepository;
import com.taskmanager.backend.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private static final int END_OF_COLUMN = Integer.MAX_VALUE;

    private TaskRepository taskRepository;
    private TaskJDBCRepository taskJDBCRepository;

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.getReferenceById(id);
    }

    @Override
    public List<TaskDTO> getTasks() {
        return taskRepository.findAll().stream()
                .map(task -> TaskDTO.builder()
                        .id(task.getId())
                        .title(task.getTitle())
                        .status(task.getStatus())
                        .description(task.getDescription())
                        .orderNumber(task.getOrderNumber())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public TaskDTO createTask(Task task) {
        taskRepository.save(task);
        return TaskDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .status(task.getStatus())
                .description(task.getDescription())
                .orderNumber(task.getOrderNumber())
                .build();
    }

    @Override
    public TaskDTO updateTask(Long id, Task task) {
        Task updatedTask;
        if(taskRepository.findById(id).isPresent()) {
            updatedTask = taskRepository.save(task);
        }else{
            throw new ResourceNotFoundException("Task with ID " + id + " not found.");
        }

        return TaskDTO.builder()
                .id(updatedTask.getId())
                .title(updatedTask.getTitle())
                .status(updatedTask.getStatus())
                .description(updatedTask.getDescription())
                .orderNumber(updatedTask.getOrderNumber())
                .build();
    }

    @Override
    public void deleteTask(Long id) {
        if(!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Task with ID " + id + " not found.");
        }
        taskRepository.deleteById(id);
    }

    @Override
    public void reorderTasks(ReorderRequest request, Long taskId) {
        if(request.getToIndex().equals(request.getFromIndex())) return;
        Task movedTask =  taskRepository.getReferenceById(taskId);
        if(movedTask.getStatus().equals(request.getStatus())) {// Moved inside the column
            if(request.getFromIndex()>request.getToIndex()){
                taskJDBCRepository.shiftTasksDownward(request.getStatus(), request.getFromIndex(), request.getToIndex());
            }else {
                taskJDBCRepository.shiftTasksUpward(request.getStatus(), request.getFromIndex(), request.getToIndex());
            }
        }else{ // Moved outside the column
            taskJDBCRepository.shiftTasksDownward(movedTask.getStatus(), request.getFromIndex(), END_OF_COLUMN);
            taskJDBCRepository.shiftTasksUpward(request.getStatus(), 0, request.getToIndex());
        }
        movedTask.setStatus(request.getStatus());
        movedTask.setOrderNumber(request.getToIndex());
        updateTask(taskId, movedTask);
    }



}
