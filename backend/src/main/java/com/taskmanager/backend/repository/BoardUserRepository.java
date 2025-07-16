package com.taskmanager.backend.repository;

import com.taskmanager.backend.entity.Board;
import com.taskmanager.backend.entity.BoardUser;
import com.taskmanager.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardUserRepository extends JpaRepository<BoardUser, Long> {
    boolean existsByUserIdAndBoardId(User user, Board board);
}
