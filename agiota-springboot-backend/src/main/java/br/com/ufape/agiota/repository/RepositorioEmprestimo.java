package br.com.ufape.agiota.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.ufape.agiota.model.negocios.Emprestimo;

@Repository
public interface RepositorioEmprestimo extends JpaRepository<Emprestimo, Long> {

}