package com.taskmanager.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tasks")
public class Task {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;
   private String title;
   private String description;
   private String status;
   private Integer orderNumber;
   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "board_id")
   private Board board;
}
