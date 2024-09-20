package br.com.ufape.agiota.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufape.agiota.model.usuarios.Usuario;
import br.com.ufape.agiota.repository.RepositorioUsuario;

@RestController
@RequestMapping("/api/usuarios")
public class ControllerUsuario {

	@Autowired
	private RepositorioUsuario repositorioUsuario;
	
	@GetMapping()
	public List<Usuario> listarTodosUsuarios() {
		return repositorioUsuario.findAll();
	}
	
	@GetMapping("/{id}")
	public Usuario buscarUsuarioPorId(@PathVariable Long id) {
		return repositorioUsuario.findById(id).orElse(null);
	}

	@GetMapping("/buscar-por-email/{email}")
	public Usuario buscarUsuarioPorEmail(@PathVariable String email) {
		return repositorioUsuario.findByLoginEmail(email);
	}
	
	@DeleteMapping("/{id}")
	public void removerUsuarioPorId(@PathVariable Long id) {
		repositorioUsuario.deleteById(id);
	}
	
}
