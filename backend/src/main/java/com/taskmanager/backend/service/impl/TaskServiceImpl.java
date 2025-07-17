package com.taskmanager.backend.service.impl;

import com.taskmanager.backend.dto.CreateTaskRequest;
import com.taskmanager.backend.dto.ReorderRequest;
import com.taskmanager.backend.dto.TaskDTO;
import com.taskmanager.backend.entity.Board;
import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.exception.ResourceNotFoundException;
import com.taskmanager.backend.jdbc.TaskJDBCRepository;
import com.taskmanager.backend.repository.BoardRepository;
import com.taskmanager.backend.repository.TaskRepository;
import com.taskmanager.backend.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private static final int END_OF_COLUMN = Integer.MAX_VALUE;

    private TaskRepository taskRepository;
    private TaskJDBCRepository taskJDBCRepository;
    private BoardRepository boardRepository;

    @Override
    public TaskDTO findTaskById(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        return TaskDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .orderNumber(task.getOrderNumber())
                .boardId(task.getBoard().getId())
                .build();
    }

    @Override
    public List<TaskDTO> getTasks(Long boardId) {
        Board board = boardRepository.getReferenceById(boardId);
        return taskRepository.getAllTasksByBoardIdSortedWithOrderNumber(board.getId()).stream()
                .map(task -> TaskDTO.builder()
                        .id(task.getId())
                        .title(task.getTitle())
                        .status(task.getStatus())
                        .description(task.getDescription())
                        .orderNumber(task.getOrderNumber())
                        .boardId(board.getId())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public TaskDTO createTask(CreateTaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setBoard(boardRepository.getReferenceById(request.getBoardId()));
        int maxOrderNumber = taskRepository.getMaxOrderNumberByStatus(task.getStatus())
                .orElse(-1);
        task.setOrderNumber(maxOrderNumber + 1);

        Task savedTask = taskRepository.save(task);
        return TaskDTO.builder()
                .id(savedTask.getId())
                .title(savedTask.getTitle())
                .description(savedTask.getDescription())
                .status(savedTask.getStatus())
                .orderNumber(savedTask.getOrderNumber())
                .boardId(savedTask.getBoard().getId())
                .build();
    }

    @Override
    public TaskDTO updateTask(Long id, Task updatedFields) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task with ID " + id + " not found."));

        existingTask.setTitle(updatedFields.getTitle());
        existingTask.setDescription(updatedFields.getDescription());

        Task updatedTask = taskRepository.save(existingTask);

        return TaskDTO.builder()
                .id(updatedTask.getId())
                .title(updatedTask.getTitle())
                .description(updatedTask.getDescription())
                .status(updatedTask.getStatus())
                .orderNumber(updatedTask.getOrderNumber())
                .boardId(updatedTask.getBoard().getId())
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
        Task movedTask =  taskRepository.getReferenceById(taskId);
        if(request.getToIndex().equals(request.getFromIndex()) && request.getStatus().equals(movedTask.getStatus())) return;
        if(movedTask.getStatus().equals(request.getStatus())) {// Moved inside the column
            if(request.getFromIndex()>request.getToIndex()){
                taskJDBCRepository.shiftTasksDownward(movedTask.getStatus(), request.getStatus(), request.getFromIndex(), request.getToIndex());
            }else {
                taskJDBCRepository.shiftTasksUpward(movedTask.getStatus(), request.getStatus(), request.getFromIndex(), request.getToIndex());
            }
        }else{ // Moved outside the column
            taskJDBCRepository.shiftTasksDownward(movedTask.getStatus(), request.getStatus(), END_OF_COLUMN, request.getToIndex());
            taskJDBCRepository.shiftTasksUpward(movedTask.getStatus(), request.getStatus(), request.getFromIndex(), END_OF_COLUMN);
        }
        movedTask.setStatus(request.getStatus());
        movedTask.setOrderNumber(request.getToIndex());
        updateTask(taskId, movedTask);
    }



}
