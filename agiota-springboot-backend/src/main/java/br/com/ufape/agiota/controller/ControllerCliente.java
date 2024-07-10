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
import br.com.ufape.agiota.model.usuarios.Cliente;
import br.com.ufape.agiota.repository.RepositorioCliente;

@RestController
@RequestMapping("/api/clientes")
public class ControllerCliente {
	
	@Autowired
	private RepositorioCliente repositorioCliente;
	
	@GetMapping
	public List<Cliente> listarTodosClientes() {
		return repositorioCliente.findAll();
	}
	
	@GetMapping("/{id}")
	public Cliente buscarClientePorId(@PathVariable Long id) {
		return repositorioCliente.findById(id).orElse(null);
	}
	
	@PostMapping
	public Cliente cadastrarCliente(@RequestBody Cliente cliente) {
		return repositorioCliente.save(cliente);
	}
	
	@DeleteMapping("/{id}")
	public void removerClientePorId(@PathVariable Long id) {
		repositorioCliente.deleteById(id);
	}
	
	@PutMapping("/{id}")
	public Cliente editarCliente(@RequestBody Cliente usuarioAtualizado, @PathVariable Long id) {
		Cliente usuarioAntigo = repositorioCliente.findById(id).orElse(null);
		if (usuarioAntigo != null) {
			usuarioAntigo.setNome(usuarioAtualizado.getNome());
			usuarioAntigo.setTelefone(usuarioAtualizado.getTelefone());
			usuarioAntigo.setDataDeNascimento(usuarioAtualizado.getDataDeNascimento());
			usuarioAntigo.setEndereco(usuarioAtualizado.getEndereco());
			usuarioAntigo.setLogin(usuarioAtualizado.getLogin());
            return repositorioCliente.save(usuarioAntigo);
        } else {
            throw new DadoNaoEncontradoException("Cliente de id " + id + " não encontrado");
        }
	}

}
