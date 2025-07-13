package com.taskmanager.backend.jdbc;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
@RequiredArgsConstructor
public class TaskJDBCRepository {

    private final NamedParameterJdbcTemplate namedTemplate;

    public void shiftTasksDownward(String status, int fromIndex, int toIndex) {
        if(fromIndex == toIndex) return;
        String updateOtherTasks = "";
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("status", status)
                .addValue("fromIndex", fromIndex)
                .addValue("toIndex", toIndex);
        updateOtherTasks = """
              UPDATE tasks t
              SET t.orderNumber = t.orderNumber - 1
              WHERE t.status = :status and t.orderNumber > :fromIndex and t.orderNumber <= :toIndex
              """;
        namedTemplate.update(updateOtherTasks, params);
    }

    public void shiftTasksUpward(String status, int fromIndex, int toIndex) {
        if(fromIndex == toIndex) return;
        String updateOtherTasks = "";
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("status", status)
                .addValue("fromIndex", fromIndex)
                .addValue("toIndex", toIndex);
        updateOtherTasks = """
                  UPDATE tasks t
                  SET t.orderNumber = t.orderNumber  + 1
                  WHERE t.status = :status and t.orderNumber <= :fromIndex and t.orderNumber > :toIndex
                  """;
        namedTemplate.update(updateOtherTasks, params);
    }
}
