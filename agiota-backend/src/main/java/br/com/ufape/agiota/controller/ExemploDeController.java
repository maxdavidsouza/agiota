package br.com.ufape.agiota.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufape.agiota.exception.ExemploDeException;
import br.com.ufape.agiota.model.ExemploDeModel;
import br.com.ufape.agiota.repository.ExemploDeRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/exemplo-de-api/v1")
public class ExemploDeController {
	
	@GetMapping("/exemplos-de-model")
	public List<ExemploDeModel> listarTodosExemplosDeModel() throws ExemploDeException {
		ExemploDeRepository.findAll();
	}
}
