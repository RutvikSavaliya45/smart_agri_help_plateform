package com.agrihelp.agrihelp_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "expert_questions")
@Data
public class ExpertQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String farmerName;
    private String question;

    private String answer;

    // Pending | In Progress | Completed
    private String status;
}

