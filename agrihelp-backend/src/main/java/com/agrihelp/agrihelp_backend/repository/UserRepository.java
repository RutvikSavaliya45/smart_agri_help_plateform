package com.agrihelp.agrihelp_backend.repository;

import com.agrihelp.agrihelp_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
}

