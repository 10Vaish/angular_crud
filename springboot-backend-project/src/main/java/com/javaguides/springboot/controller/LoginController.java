package com.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaguides.springboot.model.Login;
import com.javaguides.springboot.service.LoginService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	@PostMapping("/login")
    public ResponseEntity<Map<String, String>> authenticate(@RequestBody Login login) {
        if (loginService.validLogin(login)) {
        	Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
        	Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid login credentials");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }
}
