package com.proyecto_moviles.oficiar.exceptions.UserExceptions;

public class UsuarioExistenteException extends RuntimeException {
    public UsuarioExistenteException(String message) {
        super(message);
    }
}
