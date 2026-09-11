package com.proyecto_moviles.oficiar.exceptions.UserExceptions;

/**
 * Excepción personalizada cuando el email proporcionado no coincide
 * con el registrado para el usuario.
 */
public class InvalidEmailException extends RuntimeException {
    public InvalidEmailException(String message) {
        super(message);
    }
}
