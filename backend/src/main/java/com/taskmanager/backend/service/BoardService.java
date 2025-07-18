package com.taskmanager.backend.service;

import com.taskmanager.backend.dto.AddUserToBoardRequest;
import com.taskmanager.backend.dto.BoardDTO;
import com.taskmanager.backend.dto.UserDTO;

import java.util.List;

public interface BoardService {
    BoardDTO createBoard(BoardDTO board);
    List<BoardDTO> getBoardsByUsername(String username);
    List<UserDTO> getUsersByBoardId(Long boardId);
    UserDTO addUserToBoard(AddUserToBoardRequest request, Long boardId);
    String getUserRoleByBoardIdAndUsername(Long id, String username);
}
