package com.proyecto_moviles.oficiar.repositories;

import com.proyecto_moviles.oficiar.models.entities.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Long> {

    // Método para verificar duplicados por nombre de oficio antes de guardar
    boolean existsByOficioIgnoreCase(String oficio);

    // Búsqueda por oficio exacto
    Optional<Perfil> findByOficioIgnoreCase(String oficio);
}
