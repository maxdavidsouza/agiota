package br.com.ufape.agiota.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.ufape.agiota.model.usuarios.Notificacao;

@Repository
public interface RepositorioNotificacao extends JpaRepository<Notificacao, Long> {

}
