package com.agrihelp.agrihelp_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agrihelp.agrihelp_backend.model.ExpertQuestion;

public interface ExpertQuestionRepository extends JpaRepository<ExpertQuestion, Long> {
        List<ExpertQuestion> findByFarmerName(String farmerName);

}

