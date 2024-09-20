package br.com.ufape.agiota.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.ufape.agiota.model.usuarios.Usuario;

@Repository
public interface RepositorioUsuario extends JpaRepository<Usuario, Long> {
    Usuario findByLoginEmail(String email);
}