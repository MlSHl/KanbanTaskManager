package com.taskmanager.backend.jdbc;

import com.taskmanager.backend.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class BoardUserJDBCRepository {

    private final NamedParameterJdbcTemplate namedTemplate;

    public List<UserDTO> findUsersByBoardId(Long boardId) {
        String sql = """
                select u.id, u.username, u.email, u.role
                from users u
                inner join board_user bu
                on u.id = bu.user_id
                where bu.board_id = :board_id
                """;

        Map<String, Object> params = Map.of("board_id", boardId);

        return namedTemplate.query(sql, params, (rs, rowNum) ->
                new UserDTO(
                rs.getLong("id"),
                rs.getString("username"),
                rs.getString("email"),
                rs.getString("role")
                )
        );
    }

    public void addUserToBoard(Long userId, Long boardId) {
        String sql = "INSERT INTO board_user (board_id, user_id) VALUES (:boardId, :userId)";
        Map<String, Object> params = Map.of(
                "boardId", boardId,
                "userId", userId
        );
        namedTemplate.update(sql, params);
    }
}
