package br.com.ufape.agiota.repository;

import java.util.List;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.ufape.agiota.model.usuarios.Notificacao;
import br.com.ufape.agiota.model.usuarios.Usuario;

@Repository
public interface RepositorioNotificacao extends JpaRepository<Notificacao, Long> {
	
	List<Notificacao> findAllByRemetenteId(Long id);
	List<Notificacao> findAllByDestinatarioId(Long id);
	List<Notificacao> findAllByDestinatarioIdAndRemetenteIdIsNot(Long id, Long id2);
	List<Notificacao> findAllByDestinatarioIdAndRemetenteId(Long id, Long id2);
	
	@Modifying
    @Transactional
	void deleteByIdAndRemetenteId(Long id, Long remetenteId);
	
	// Retorna o destinatário de uma notificação específica
    @Query("SELECT n.destinatario FROM Notificacao n WHERE n.id = :notificacaoId")
    Usuario findDestinatarioByNotificacaoId(@Param("notificacaoId") Long notificacaoId);

    // Retorna o remetente de uma notificação específica
    @Query("SELECT n.remetente FROM Notificacao n WHERE n.id = :notificacaoId")
    Usuario findRemetenteByNotificacaoId(@Param("notificacaoId") Long notificacaoId);

    // Retorna uma lista de destinatários de um remetente específico
    @Query("SELECT n.destinatario FROM Notificacao n WHERE n.remetente.id = :remetenteId")
    List<Usuario> findDestinatariosByRemetenteId(@Param("remetenteId") Long remetenteId);

    // Retorna uma lista de remetentes de um destinatário específico
    @Query("SELECT n.remetente FROM Notificacao n WHERE n.destinatario.id = :destinatarioId")
    List<Usuario> findRemetentesByDestinatarioId(@Param("destinatarioId") Long destinatarioId);
}
