package com.taskmanager.backend.service.impl;

import com.taskmanager.backend.dto.BoardDTO;
import com.taskmanager.backend.entity.Board;
import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.dto.UserDTO;
import com.taskmanager.backend.jdbc.BoardUserJDBCRepository;
import com.taskmanager.backend.repository.BoardRepository;
import com.taskmanager.backend.repository.BoardUserRepository;
import com.taskmanager.backend.repository.UserRepository;
import com.taskmanager.backend.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final BoardUserRepository boardUserRepository;
    private final BoardUserJDBCRepository userJDBCRepository;

    @Override
    public BoardDTO createBoard(BoardDTO board) {
        Board newBoard = new Board();
        newBoard.setTitle(board.getTitle());
        Optional<User> user = userRepository.findByUsername(board.getCreatorName());
        newBoard.setCreator(user.get());
        boardRepository.save(newBoard);
        return toDTO(newBoard);
    }
    @Override
    public List<BoardDTO> getBoardsByUsername(String username) {
        List<Board> boards = boardRepository.findBoardsByCreatorUsername(username);
        return boards.stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<UserDTO> getUsersByBoardId(Long boardId) {
        return userJDBCRepository.findUsersByBoardId(boardId);
    }

    @Override
    public UserDTO addUserToBoard(String username, Long boardId) {
        User user = userRepository.getUserByUsername(username);
        if(boardUserRepository.existsByUserIdAndBoardId(user , boardRepository.getReferenceById(boardId))){
           return userToDTO(user);
        }
        userJDBCRepository.addUserToBoard(user.getId(), boardId);
        return userToDTO(user);
    }

    private UserDTO userToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().toString())
                .build();
    }

    private BoardDTO toDTO(Board board) {
        return BoardDTO.builder()
                .id(board.getId())
                .title(board.getTitle())
                .creatorName(board.getCreator().getUsername())
                .build();
    }



}
