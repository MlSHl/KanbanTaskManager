package com.taskmanager.backend.repository;

import com.taskmanager.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("select t from Task t order by t.orderNumber asc")
    List<Task> getAllSortedTasks();

    @Query("select MAX(t.orderNumber) from Task t where t.status = :status and t.orderNumber is not null")
    Optional<Integer> getMaxOrderNumberByStatus(@Param("status") String status);
}
