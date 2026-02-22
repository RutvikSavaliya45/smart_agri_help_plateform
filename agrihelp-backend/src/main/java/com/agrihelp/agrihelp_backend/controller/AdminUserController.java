package com.agrihelp.agrihelp_backend.controller;

import com.agrihelp.agrihelp_backend.model.User;
import com.agrihelp.agrihelp_backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin
public class AdminUserController {

    private final UserService service;

    public AdminUserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }

    @PutMapping("/status/{id}")
    public User updateStatus(@PathVariable Long id, @RequestBody User u) {
        return service.updateStatus(id, u.getStatus());
    }

    @PutMapping("/role/{id}")
    public User updateRole(@PathVariable Long id, @RequestBody User u) {
        return service.updateRole(id, u.getRole());
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        service.deleteUser(id);
    }
}
