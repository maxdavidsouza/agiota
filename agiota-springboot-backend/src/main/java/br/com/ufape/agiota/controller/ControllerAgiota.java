package br.com.ufape.agiota.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufape.agiota.model.negocios.Emprestimo;
import br.com.ufape.agiota.model.usuarios.Agiota;
import br.com.ufape.agiota.repository.RepositorioAgiota;
import br.com.ufape.agiota.repository.RepositorioEmprestimo;

@RestController
@RequestMapping("/api/agiotas")
public class ControllerAgiota {

	@Autowired
	private RepositorioAgiota repositorioAgiota;
	
	@Autowired
	private RepositorioEmprestimo repositorioEmprestimo;
	
	@GetMapping
	public List<Agiota> listarTodosAgiotas() {
		return repositorioAgiota.findAll();
	}
	
	@GetMapping("/{id}")
	public Agiota buscarAgiotaPorId(@PathVariable Long id) {
		return repositorioAgiota.findById(id).orElse(null);
	}
	
	@PostMapping
	public Agiota cadastrarAgiota(@RequestBody Agiota agiota) {
		return repositorioAgiota.save(agiota);
	}
	
	@DeleteMapping("/{id}")
	public void removerAgiotaPorId(@PathVariable Long id) {
		repositorioAgiota.deleteById(id);
	}
	
	@PostMapping("/{id}/emprestimos")
	public Emprestimo publicarEmprestimo(@RequestBody Emprestimo emprestimo, @PathVariable Long id) {
		emprestimo.setCredor(repositorioAgiota.findById(id).orElse(null));
		return repositorioEmprestimo.save(emprestimo);
	}
}
