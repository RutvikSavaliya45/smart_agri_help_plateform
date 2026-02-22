package com.agrihelp.agrihelp_backend.model;



import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String password;

    // farmer | admin | expert
    private String role;
    private String status;
}

