package com.restapiexample.SpringRest3.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restapiexample.SpringRest3.payload.auth.AccountViewDTO;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class HomeController {
    
    @GetMapping("/api/v1")
    public String home(){
        return "This is homepage";
    }

    @GetMapping("/test")
    @SecurityRequirement(name = "anil-demo-api")
    @Tag(name = "Test", description = "Test API")
    public String test(){
        return "This is test rest API";
    }

    @GetMapping("/test2")
    @Tag(name = "Test 2", description = "Test2")
    public AccountViewDTO view2(){
        AccountViewDTO accountViewDTO = new AccountViewDTO();
        accountViewDTO.setId(1);
        accountViewDTO.setEmail("email@email.com");
        accountViewDTO.setAuthorities("USER");
        return accountViewDTO;
        
    }
}
