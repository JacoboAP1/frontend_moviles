package com.proyecto_moviles.oficiar.exceptions;

/**
 * Excepción personalizada cuando el email proporcionado no coincide
 * con el registrado para el usuario.
 */
public class InvalidEmailException extends RuntimeException {
    public InvalidEmailException(String message) {
        super(message);
    }
}
