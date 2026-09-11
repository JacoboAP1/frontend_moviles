package com.proyecto_moviles.oficiar.exceptions.UserExceptions;

public class BadCredentialsException extends RuntimeException {
    public BadCredentialsException(String message) {
        super(message);
    }
}
