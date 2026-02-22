package com.agrihelp.agrihelp_backend.repository;

import com.agrihelp.agrihelp_backend.model.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchemeRepository extends JpaRepository<Scheme, Long> {
}
