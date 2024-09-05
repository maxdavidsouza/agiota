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
@RequestMapping("/api")
public class ControllerCliente {
	
	@Autowired
	private RepositorioCliente repositorioCliente;
	
	@Autowired
	private RepositorioLogin repositorioLogin;
	
	//Requisições Específicas para Interação entre Usuários do Sistema
	@GetMapping("/agiotas/{id}/clientes")
	public List<Cliente> listarTodosClientesDeUmAgiota(@PathVariable Long id){
		return repositorioCliente.findAllByEmprestimosCredorId(id);
	}
	
	@GetMapping("/agiotas/{id}/emprestimos/{id2}/cliente")
	public Cliente buscarUmClienteDeUmEmprestimoDeUmAgiota(@PathVariable Long id){
		return repositorioCliente.findClienteByEmprestimoId(id);
	}

	@GetMapping("/buscar-por-email/{email}")
	public Cliente buscarClientePorEmail(@PathVariable String email) {
		return repositorioCliente.findByLoginEmail(email);
	}
	
	//Requisições Genéricas para Manutenção do Sistema
	@GetMapping("/clientes")
	public List<Cliente> listarTodosClientes() {
		return repositorioCliente.findAll();
	}
	
	@GetMapping("/clientes/{id}")
	public Cliente buscarClientePorId(@PathVariable Long id) {
		return repositorioCliente.findById(id).orElse(null);
	}
	
	@PostMapping("/clientes")
	public Cliente cadastrarCliente(@RequestBody Cliente cliente) {
		EmailDuplicadoException.validar(cliente.getLogin().getEmail(), repositorioLogin.findAll());
		return repositorioCliente.save(cliente);
	}
	
	@DeleteMapping("/clientes/{id}")
	public void removerClientePorId(@PathVariable Long id) {
		repositorioCliente.deleteById(id);
	}
	
	@PutMapping("/clientes/{id}")
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
