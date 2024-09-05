package br.com.ufape.agiota.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.ufape.agiota.model.usuarios.Cliente;

@Repository
public interface RepositorioCliente extends JpaRepository<Cliente, Long> {
	@Query("SELECT a FROM Cliente a JOIN a.emprestimos e WHERE e.id = :emprestimoId")
    Cliente findClienteByEmprestimoId(@Param("emprestimoId") Long emprestimoId);
	
	@Query("SELECT DISTINCT c FROM Cliente c JOIN c.emprestimos e WHERE e.credor.id = :agiotaId")
    List<Cliente> findAllByEmprestimosCredorId(@Param("agiotaId") Long agiotaId);

    Cliente findByLoginEmail(String email);
}