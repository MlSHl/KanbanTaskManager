package com.taskmanager.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReorderRequest {
    private Integer fromIndex;
    private Integer toIndex;
    private String status;
}
