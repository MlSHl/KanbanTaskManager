package com.taskmanager.backend.entity.CompositeIds;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
public class BoardUserId implements Serializable {
    private Long userId;
    private Long boardId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BoardUserId that)) return false;
        return Objects.equals(userId, that.userId) && Objects.equals(boardId, that.boardId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, boardId);
    }
}
