package com.agrihelp.agrihelp_backend.controller;

import com.agrihelp.agrihelp_backend.model.Scheme;
import com.agrihelp.agrihelp_backend.service.SchemeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schemes")
@CrossOrigin(origins = "http://localhost:5173")
public class SchemeController {

    private final SchemeService service;

    public SchemeController(SchemeService service) {
        this.service = service;
    }

    // ADMIN → Add scheme
    @PostMapping("/add")
    public Scheme addScheme(@RequestBody Scheme scheme) {
        return service.addScheme(scheme);
    }

    // ADMIN → Update scheme
    @PutMapping("/update/{id}")
    public Scheme updateScheme(
            @PathVariable Long id,
            @RequestBody Scheme scheme) {
        return service.updateScheme(id, scheme);
    }

    // ADMIN → Delete scheme
    @DeleteMapping("/delete/{id}")
    public void deleteScheme(@PathVariable Long id) {
        service.deleteScheme(id);
    }

    // FARMER → View schemes
    @GetMapping("/all")
    public List<Scheme> getSchemes() {
        return service.getAllSchemes();
    }
}
