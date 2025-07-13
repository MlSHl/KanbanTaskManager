package com.taskmanager.backend.jdbc;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
@RequiredArgsConstructor
public class TaskJDBCRepository {

    private final NamedParameterJdbcTemplate namedTemplate;

    public void shiftTasksDownward(String fromStatus, String toStatus, int fromIndex, int toIndex) {
        if(fromIndex == toIndex && fromStatus.equals(toStatus)) return;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("status", toStatus)
                .addValue("fromIndex", fromIndex)
                .addValue("toIndex", toIndex);
        String updateOtherTasks = """
              UPDATE tasks
              SET order_number = order_number + 1
              WHERE status = :status and order_number < :fromIndex and order_number >= :toIndex
              """;
        namedTemplate.update(updateOtherTasks, params);
    }

    public void shiftTasksUpward(String fromStatus, String toStatus, int fromIndex, int toIndex) {
        if(fromIndex == toIndex && fromStatus.equals(toStatus)) return;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("status", fromStatus)
                .addValue("fromIndex", fromIndex)
                .addValue("toIndex", toIndex);
        String updateOtherTasks = """
                  UPDATE tasks
                  SET order_number = order_number  - 1
                  WHERE status = :status and order_number > :fromIndex and order_number <= :toIndex
                  """;
        namedTemplate.update(updateOtherTasks, params);
    }
}
