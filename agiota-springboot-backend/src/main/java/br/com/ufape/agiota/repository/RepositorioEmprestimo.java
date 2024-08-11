package br.com.ufape.agiota.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.ufape.agiota.model.negocios.Emprestimo;
import java.math.BigDecimal;


@Repository
public interface RepositorioEmprestimo extends JpaRepository<Emprestimo, Long> {
	List<Emprestimo> findAllByDevedorId(Long clienteId);
	List<Emprestimo> findAllByCredorId(Long agiotaId);
	List<Emprestimo> findAllByEstado(String estado);
	List<Emprestimo> findAllByEstadoAndCredorId(String estado, Long agiotaId);
	Emprestimo findByEstadoAndCredorId(String estado, Long agiotaId);
	List<Emprestimo> findAllByValorEmprestado(BigDecimal valorEmprestado);
	List<Emprestimo> findAllByValorASerPago(BigDecimal valorASerPago);
	List<Emprestimo> findAllByValorEmprestadoBetween(BigDecimal valorMin, BigDecimal valorMax);
	Emprestimo findByIdAndCredorId(Long id, Long agiotaId);
	Emprestimo findByIdAndDevedorId(Long id, Long clienteId);
	List<Emprestimo> findByDevedorIdAndEstado(Long clienteId, String estado);
	
	// Consulta personalizada para encontrar empréstimos com credor, devedor não nulo, e estado "Em acordo"
    @Query("SELECT e FROM Emprestimo e WHERE e.credor IS NOT NULL AND e.devedor IS NOT NULL AND e.estado = 'Em acordo'")
    List<Emprestimo> findEmprestimosEmAcordo();
    
	@Modifying
    @Transactional
	void deleteByIdAndCredorId(Long id, Long agiotaId);
}