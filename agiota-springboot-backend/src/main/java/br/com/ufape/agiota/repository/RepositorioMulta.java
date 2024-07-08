package br.com.ufape.agiota.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.ufape.agiota.model.negocios.Multa;

@Repository
public interface RepositorioMulta extends JpaRepository<Multa, Long> {

}