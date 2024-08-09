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
import br.com.ufape.agiota.exceptions.EmailDuplicadoException;
import br.com.ufape.agiota.model.usuarios.Cliente;
import br.com.ufape.agiota.repository.RepositorioCliente;
import br.com.ufape.agiota.repository.RepositorioLogin;

@RestController
@RequestMapping("/api/clientes")
public class ControllerCliente {
	
	@Autowired
	private RepositorioCliente repositorioCliente;
	
	@Autowired
	private RepositorioLogin repositorioLogin;
	
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
		EmailDuplicadoException.validar(cliente.getLogin().getEmail(), repositorioLogin.findAll());
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
			usuarioAntigo.getLogin().setEmail(usuarioAtualizado.getLogin().getEmail());
			usuarioAntigo.getLogin().setSenha(usuarioAtualizado.getLogin().getSenha());
			usuarioAntigo.getEndereco().setCep(usuarioAtualizado.getEndereco().getCep());
			usuarioAntigo.getEndereco().setNumero(usuarioAtualizado.getEndereco().getCep());
			usuarioAntigo.getEndereco().setRua(usuarioAtualizado.getEndereco().getRua());
			usuarioAntigo.getEndereco().setBairro(usuarioAtualizado.getEndereco().getBairro());
			usuarioAntigo.getEndereco().setCidade(usuarioAtualizado.getEndereco().getCidade());
			usuarioAntigo.getEndereco().setEstado(usuarioAtualizado.getEndereco().getEstado());
            return repositorioCliente.save(usuarioAntigo);
        } else {
            throw new DadoNaoEncontradoException("Cliente de id " + id + " não encontrado");
        }
	}

}
