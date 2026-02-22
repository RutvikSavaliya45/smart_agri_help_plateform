package com.agrihelp.agrihelp_backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agrihelp.agrihelp_backend.model.ExpertQuestion;
import com.agrihelp.agrihelp_backend.service.ExpertQuestionService;

@RestController
@RequestMapping("/api/expert")
@CrossOrigin("http://localhost:5173")
public class ExpertQuestionController {

    @Autowired
    private ExpertQuestionService service;

    // 👨‍🌾 Farmer
    @PostMapping("/ask")
    public ExpertQuestion ask(@RequestBody ExpertQuestion q) {
        return service.addQuestion(q);
    }

    // 👨‍🔬 Expert – View all
    @GetMapping("/all")
    public List<ExpertQuestion> all() {
        return service.getAll();
    }

    // 👨‍🔬 Answer
    @PutMapping("/answer/{id}")
    public ExpertQuestion answer(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        return service.answerQuestion(
                id,
                body.get("answer"),
                body.get("status")
        );
    }

    // 🔁 Update status only
    @PutMapping("/status/{id}")
    public ExpertQuestion updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        return service.updateStatus(id, body.get("status"));
    }

    // ❌ Delete question
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteQuestion(id);
    }

    @GetMapping("/farmer/{name}")
    public List<ExpertQuestion> getByFarmer(@PathVariable String name) {
        return service.getByFarmer(name);
    }
}
