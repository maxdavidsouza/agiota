package br.com.ufape.agiota.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.ufape.agiota.model.usuarios.Agiota;

@Repository
public interface RepositorioAgiota extends JpaRepository<Agiota, Long> {
	@Query("SELECT a FROM Agiota a JOIN a.emprestimos e WHERE e.id = :emprestimoId")
    Agiota findAgiotaByEmprestimoId(@Param("emprestimoId") Long emprestimoId);
}