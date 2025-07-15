package com.taskmanager.backend.service;

import com.taskmanager.backend.dto.BoardDTO;
import java.util.List;

public interface BoardService {
    BoardDTO createBoard(BoardDTO board);
    List<BoardDTO> getBoardsByUsername(String username);
}
