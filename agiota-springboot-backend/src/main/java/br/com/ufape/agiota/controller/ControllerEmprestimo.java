package br.com.ufape.agiota.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufape.agiota.model.negocios.Emprestimo;
import br.com.ufape.agiota.repository.RepositorioAgiota;
import br.com.ufape.agiota.repository.RepositorioCliente;
import br.com.ufape.agiota.repository.RepositorioEmprestimo;

@RestController
@RequestMapping("/api/emprestimos")
public class ControllerEmprestimo {
	
	@Autowired
	RepositorioEmprestimo repositorioEmprestimo;
	
	@Autowired
	RepositorioAgiota repositorioAgiota;
	
	@Autowired
	RepositorioCliente repositorioCliente;
	
	@GetMapping("/agiota/{id}")
	public List<Emprestimo> listarTodosEmprestimosDeUmAgiotaPorId(@PathVariable Long id) {
		return repositorioAgiota.findById(id).get().getEmprestimos();
	}
	
	@PostMapping("/agiota/{id}")
	public Emprestimo publicarEmprestimo(@RequestBody Emprestimo emprestimo, @PathVariable Long id) {
		emprestimo.setCredor(repositorioAgiota.findById(id).orElse(null));
		return repositorioEmprestimo.save(emprestimo);
	}
	
	@GetMapping("/cliente/{id}")
	public List<Emprestimo> listarTodosEmprestimosDeUmClientePorId(@PathVariable Long id) {
		return repositorioCliente.findById(id).get().getEmprestimos();
	}
	
}
