package br.com.ufape.agiota.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufape.agiota.model.autenticacao.Login;
import br.com.ufape.agiota.repository.RepositorioLogin;

@RestController
@RequestMapping("/api")
public class ControllerLogin {
	
	@Autowired
	private RepositorioLogin repositorioLogin;
	
	@GetMapping("/login/{id}")
	public Login buscarLoginPorId(@PathVariable Long id) {
		return repositorioLogin.findById(id).orElse(null);
	}
	
	@GetMapping("/login")
	public  List<Login> listarTodosLogins() {
		return repositorioLogin.findAll();
	}

}
