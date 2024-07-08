package br.com.ufape.agiota.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.ufape.agiota.model.usuarios.Agiota;

@Repository
public interface RepositorioAgiota extends JpaRepository<Agiota, Long> {

}