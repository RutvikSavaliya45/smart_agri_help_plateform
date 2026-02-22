package com.agrihelp.agrihelp_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agrihelp.agrihelp_backend.model.User;
import com.agrihelp.agrihelp_backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public User registerUser(User user) {

        // If email already exists
        if (userRepo.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already registered!");
        }

        return userRepo.save(user);
    }

    public User login(String email, String password) {
        User user = userRepo.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found!");
        }
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password!");
        }

        return user; // success
    }
    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User updateStatus(Long id, String status) {
        User user = userRepo.findById(id).orElseThrow();
        user.setStatus(status);
        return userRepo.save(user);
    }

    public User updateRole(Long id, String role) {
        User user = userRepo.findById(id).orElseThrow();
        user.setRole(role);
        return userRepo.save(user);
    }

    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }
}
