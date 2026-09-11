package com.proyecto_moviles.oficiar.models.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "perfil")
@Data
public class Perfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "oficio", nullable = false, unique = true, length = 100)
    private String oficio;

    // Constructors
    public Perfil() {
    }

    public Perfil(String oficio) {
        this.oficio = oficio;
    }

    public Perfil(Long id, String oficio) {
        this.id = id;
        this.oficio = oficio;
    }
}
