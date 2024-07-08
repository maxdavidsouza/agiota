package br.com.ufape.agiota.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufape.agiota.exceptions.DadoNaoEncontradoException;
import br.com.ufape.agiota.model.usuarios.Usuario;
import br.com.ufape.agiota.repository.RepositorioUsuario;

@RestController
@RequestMapping("/api/usuarios")
public class ControllerUsuario {

	@Autowired
	private RepositorioUsuario repositorioUsuario;
	
	@GetMapping
	public List<Usuario> listarTodosUsuarios() {
		return repositorioUsuario.findAll();
	}
	
	@GetMapping("/{id}")
	public Usuario buscarUsuarioPorId(@PathVariable Long id) {
		return repositorioUsuario.findById(id).orElse(null);
	}
	
	@PutMapping("/{id}")
	public Usuario editarUsuario(@RequestBody Usuario usuarioAtualizado, @PathVariable Long id) {
		Usuario usuarioAntigo = repositorioUsuario.findById(id).orElse(null);
		if (usuarioAntigo != null) {
			usuarioAntigo.setNome(usuarioAtualizado.getNome());
			usuarioAntigo.setTelefone(usuarioAtualizado.getTelefone());
			usuarioAntigo.setDataDeNascimento(usuarioAtualizado.getDataDeNascimento());
			usuarioAntigo.setEndereco(usuarioAtualizado.getEndereco());
			usuarioAntigo.setLogin(usuarioAtualizado.getLogin());
            return repositorioUsuario.save(usuarioAntigo);
        } else {
            throw new DadoNaoEncontradoException("Usuário de id " + id + " não encontrado");
        }
	}
	
	@DeleteMapping("/{id}")
	public void removerUsuarioPorId(@PathVariable Long id) {
		repositorioUsuario.deleteById(id);
	}
	
}
