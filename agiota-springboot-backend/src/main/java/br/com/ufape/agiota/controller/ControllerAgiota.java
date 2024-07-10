package br.com.ufape.agiota.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufape.agiota.exceptions.DadoNaoEncontradoException;
import br.com.ufape.agiota.model.usuarios.Agiota;
import br.com.ufape.agiota.repository.RepositorioAgiota;

@RestController
@RequestMapping("/api/agiotas")
public class ControllerAgiota {

	@Autowired
	private RepositorioAgiota repositorioAgiota;
	
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
	
	@PutMapping("/{id}")
	public Agiota editarAgiota(@RequestBody Agiota usuarioAtualizado, @PathVariable Long id) {
		Agiota usuarioAntigo = repositorioAgiota.findById(id).orElse(null);
		if (usuarioAntigo != null) {
			usuarioAntigo.setNome(usuarioAtualizado.getNome());
			usuarioAntigo.setTelefone(usuarioAtualizado.getTelefone());
			usuarioAntigo.setDataDeNascimento(usuarioAtualizado.getDataDeNascimento());
			usuarioAntigo.setEndereco(usuarioAtualizado.getEndereco());
			usuarioAntigo.setLogin(usuarioAtualizado.getLogin());
            return repositorioAgiota.save(usuarioAntigo);
        } else {
            throw new DadoNaoEncontradoException("Agiota de id " + id + " não encontrado");
        }
	}
	
}
