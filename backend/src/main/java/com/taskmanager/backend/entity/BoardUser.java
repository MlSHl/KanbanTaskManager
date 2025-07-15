package com.taskmanager.backend.entity;

import com.taskmanager.backend.entity.CompositeIds.BoardUserId;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@IdClass(BoardUserId.class)
public class BoardUser {
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;
    @Id
    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board boardId;
}
