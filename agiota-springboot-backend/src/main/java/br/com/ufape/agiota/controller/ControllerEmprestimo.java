package br.com.ufape.agiota.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufape.agiota.model.negocios.Emprestimo;
import br.com.ufape.agiota.repository.RepositorioEmprestimo;

@RestController
@RequestMapping("/api/emprestimos")
public class ControllerEmprestimo {
	
	@Autowired
	RepositorioEmprestimo repositorioEmprestimo;
	
	@PostMapping()
	public Emprestimo adicionarEmprestimo(Emprestimo e) {
		return repositorioEmprestimo.save(e);
	}
	
}
