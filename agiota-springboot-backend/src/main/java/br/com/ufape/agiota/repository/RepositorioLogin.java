package br.com.ufape.agiota.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.ufape.agiota.model.autenticacao.Login;

@Repository
public interface RepositorioLogin extends JpaRepository<Login, Long> {

}
