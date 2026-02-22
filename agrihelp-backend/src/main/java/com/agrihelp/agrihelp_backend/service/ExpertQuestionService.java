package com.agrihelp.agrihelp_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agrihelp.agrihelp_backend.model.ExpertQuestion;
import com.agrihelp.agrihelp_backend.repository.ExpertQuestionRepository;

@Service
public class ExpertQuestionService {

    @Autowired
    private ExpertQuestionRepository repo;

    public ExpertQuestion addQuestion(ExpertQuestion q) {
        q.setStatus("Pending");
        q.setAnswer("❓ Expert will reply soon...");
        return repo.save(q);
    }

    public ExpertQuestion answerQuestion(Long id, String answer, String status) {
        ExpertQuestion q = repo.findById(id).orElseThrow();
        q.setAnswer(answer);
        q.setStatus(status);
        return repo.save(q);
    }

    public ExpertQuestion updateStatus(Long id, String status) {
        ExpertQuestion q = repo.findById(id).orElseThrow();
        q.setStatus(status);
        return repo.save(q);
    }

    public void deleteQuestion(Long id) {
        repo.deleteById(id);
    }

    public List<ExpertQuestion> getAll() {
        return repo.findAll();
    }
    
    public List<ExpertQuestion> getByFarmer(String farmerName) {
    return repo.findByFarmerName(farmerName);
}
}
