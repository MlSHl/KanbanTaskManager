package com.taskmanager.backend.controller;


import com.taskmanager.backend.dto.BoardDTO;
import com.taskmanager.backend.dto.CreateBoardRequest;
import com.taskmanager.backend.dto.TaskDTO;
import com.taskmanager.backend.service.BoardService;
import com.taskmanager.backend.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/boards")
@RestController
@AllArgsConstructor
public class BoardController {

    final BoardService boardService;
    final TaskService taskService;

    @GetMapping()
    public ResponseEntity<List<BoardDTO>> getBoards() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(boardService.getBoardsByUsername(username), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<BoardDTO> createBoard(@RequestBody CreateBoardRequest createBoardRequest) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        BoardDTO boardDTO = new BoardDTO();
        boardDTO.setTitle(createBoardRequest.getTitle());
        boardDTO.setCreatorName(username);
        return new ResponseEntity<>(boardService.createBoard(boardDTO), HttpStatus.OK);
    }

    @GetMapping("/{id}/tasks")
    public ResponseEntity<List<TaskDTO>> getAllTasksByBoardId(@PathVariable Long id){
        return new ResponseEntity<>(taskService.getTasks(id), HttpStatus.OK);
    }
}
