package br.com.ufape.agiota.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.ufape.agiota.model.negocios.Emprestimo;
import java.math.BigDecimal;


@Repository
public interface RepositorioEmprestimo extends JpaRepository<Emprestimo, Long> {
	List<Emprestimo> findAllByDevedorId(Long clienteId);
	List<Emprestimo> findAllByCredorId(Long agiotaId);
	List<Emprestimo> findAllByEstado(String estado);
	List<Emprestimo> findAllByValorEmprestado(BigDecimal valorEmprestado);
	List<Emprestimo> findAllByValorASerPago(BigDecimal valorASerPago);
	List<Emprestimo> getByIdAndCredorId(Long id, Long agiotaId);
	List<Emprestimo> getByIdAndDevedorId(Long id, Long clienteId);
}