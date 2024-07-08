package br.com.ufape.agiota.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.ufape.agiota.model.autenticacao.Endereco;

@Repository
public interface RepositorioEndereco extends JpaRepository<Endereco, Long> {

}