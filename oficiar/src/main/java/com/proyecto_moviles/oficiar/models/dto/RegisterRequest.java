package com.proyecto_moviles.oficiar.models.dto;

import lombok.Data;

import java.util.List;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private List<String> roles;
}

