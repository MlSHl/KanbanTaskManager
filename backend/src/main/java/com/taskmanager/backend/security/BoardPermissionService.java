package com.taskmanager.backend.security;

import com.taskmanager.backend.entity.Board;
import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.enums.BoardRole;
import com.taskmanager.backend.repository.BoardRepository;
import com.taskmanager.backend.repository.BoardUserRepository;
import com.taskmanager.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class BoardPermissionService {
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final BoardUserRepository boardUserRepository;

    public boolean hasAnyRole(String username, Long boardId, BoardRole... roles) {
        User user = userRepository.getUserByUsername(username);
        Board board = boardRepository.getReferenceById(boardId);
        return boardUserRepository.existsByUserIdAndBoardIdAndRoleIn(user, board, List.of(roles));
    }

    public boolean canDeleteBoard(String username, Long boardId) {
        return hasAnyRole(username, boardId, BoardRole.OWNER);
    }

    public boolean canAddMembersAndDeleteTasks(String username, Long boardId) {
        return hasAnyRole(username, boardId, BoardRole.OWNER, BoardRole.ADMIN);
    }

    public boolean canEditBoard(String username, Long boardId) {
        return hasAnyRole(username, boardId, BoardRole.OWNER, BoardRole.ADMIN, BoardRole.MEMBER);
    }

    public boolean canView(String username, Long boardId) {
        return hasAnyRole(username, boardId, BoardRole.OWNER, BoardRole.ADMIN, BoardRole.MEMBER, BoardRole.VIEWER);
    }
}
