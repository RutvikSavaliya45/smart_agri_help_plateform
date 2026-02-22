package com.agrihelp.agrihelp_backend.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.agrihelp.agrihelp_backend.model.User;
import com.agrihelp.agrihelp_backend.service.UserService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User loginData) {
         User user = userService.login(loginData.getEmail(), loginData.getPassword());

        if (user == null) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
        
    }
}

