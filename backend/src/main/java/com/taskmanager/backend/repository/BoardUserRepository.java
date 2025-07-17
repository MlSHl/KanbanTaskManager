package com.taskmanager.backend.repository;

import com.taskmanager.backend.entity.Board;
import com.taskmanager.backend.entity.BoardUser;
import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.enums.BoardRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardUserRepository extends JpaRepository<BoardUser, Long> {
    boolean existsByUserIdAndBoardId(User user, Board board);
    boolean existsByUserIdAndBoardIdAndRoleIn(User user, Board board, List<BoardRole> roles);
    @Query("SELECT bu.role FROM BoardUser bu WHERE bu.userId = :user AND bu.boardId = :board")
    BoardRole getBoardRoleByUserIdAndBoardId(@Param("user") User user, @Param("board") Board board);

    @Query("""
        SELECT DISTINCT b FROM Board b
        LEFT JOIN BoardUser bu ON bu.boardId = b
        WHERE b.creator.username = :username
           OR bu.userId.username = :username
    """)
    List<Board> findBoardsByUser(@Param("username") String username);
}
