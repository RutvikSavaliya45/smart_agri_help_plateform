package com.agrihelp.agrihelp_backend.service;

import com.agrihelp.agrihelp_backend.model.Scheme;
import com.agrihelp.agrihelp_backend.repository.SchemeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchemeService {

    private final SchemeRepository repo;

    public SchemeService(SchemeRepository repo) {
        this.repo = repo;
    }

    public Scheme addScheme(Scheme scheme) {
        return repo.save(scheme);
    }

    public List<Scheme> getAllSchemes() {
        return repo.findAll();
    }

    public Scheme updateScheme(Long id, Scheme scheme) {
        Scheme existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Scheme not found"));

        existing.setTitle(scheme.getTitle());
        existing.setDescription(scheme.getDescription());
        existing.setLink(scheme.getLink());

        return repo.save(existing);
    }

    public void deleteScheme(Long id) {
        repo.deleteById(id);
    }
}
