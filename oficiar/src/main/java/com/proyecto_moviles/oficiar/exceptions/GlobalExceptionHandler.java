package com.proyecto_moviles.oficiar.exceptions;

import com.proyecto_moviles.oficiar.exceptions.PerfilExceptions.OficioAsociadoException;
import com.proyecto_moviles.oficiar.exceptions.PerfilExceptions.OficioInvalidoException;
import com.proyecto_moviles.oficiar.exceptions.PerfilExceptions.OficioNoEncontradoException;
import com.proyecto_moviles.oficiar.exceptions.RoleExceptions.RolNoPermitidoException;
import com.proyecto_moviles.oficiar.exceptions.UserExceptions.BadCredentialsException;
import com.proyecto_moviles.oficiar.exceptions.UserExceptions.CamposVaciosException;
import com.proyecto_moviles.oficiar.exceptions.UserExceptions.InvalidEmailException;
import com.proyecto_moviles.oficiar.exceptions.UserExceptions.UsuarioExistenteException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

/**
 * Manejador global de excepciones personalizadas.
 * Retorna respuestas JSON legibles para Postman o clientes HTTP.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidEmailException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidEmail(InvalidEmailException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of(
                        "error", "Invalid email",
                        "message", ex.getMessage()
                ));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, Object>> handleBadCredentials(BadCredentialsException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of(
                        "error", "Invalid credentials",
                        "message", ex.getMessage()
                ));
    }

    @ExceptionHandler(OficioInvalidoException.class)
    public ResponseEntity<Map<String, Object>> handleBadOficio(OficioInvalidoException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of(
                        "error", "Oficio para trabajador inválido",
                        "message", ex.getMessage()
                ));
    }

    @ExceptionHandler(CamposVaciosException.class)
    public ResponseEntity<Map<String, Object>> handleCamposVacios(CamposVaciosException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of(
                        "error", "Algún campo de registro se encuentra vacío",
                        "message", ex.getMessage()
                ));
    }

    @ExceptionHandler(UsuarioExistenteException.class)
    public ResponseEntity<Map<String, Object>> handleUsuarioExistente(UsuarioExistenteException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of(
                        "error", "No se permiten usuarios duplicados",
                        "message", ex.getMessage()
                ));
    }

    @ExceptionHandler(RolNoPermitidoException.class)
    public ResponseEntity<Map<String, Object>> handleRoleInvalido(RolNoPermitidoException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of(
                        "error", "No se permite ese rol dentro de la plataforma",
                        "message", ex.getMessage()
                ));
    }

    @ExceptionHandler(OficioNoEncontradoException.class)
    public ResponseEntity<Map<String, Object>> handleOficioNoEncontrado(OficioNoEncontradoException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of(
                        "error", "No se encontró un oficio con ese ID",
                        "message", ex.getMessage()
                ));
    }

    @ExceptionHandler(OficioAsociadoException.class)
    public ResponseEntity<Map<String, Object>> handleOficioAsociado(OficioAsociadoException ex) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of(
                        "error", "Oficio en uso",
                        "message", ex.getMessage()
                ));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of(
                        "error", "Solicitud inválida",
                        "message", ex.getMessage()
                ));
    }
}