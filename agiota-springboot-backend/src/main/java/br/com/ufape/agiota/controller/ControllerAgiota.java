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
import br.com.ufape.agiota.model.usuarios.Agiota;
import br.com.ufape.agiota.repository.RepositorioAgiota;
import br.com.ufape.agiota.repository.RepositorioLogin;

@RestController
@RequestMapping("/api/agiotas")
public class ControllerAgiota {

	@Autowired
	private RepositorioAgiota repositorioAgiota;
	
	@Autowired
	private RepositorioLogin repositorioLogin;
	
	//Requisições Específicas para Interação entre Usuários do Sistema
	@GetMapping("/clientes/{id}/emprestimos/{id2}/agiota")
	public Agiota buscarUmAgiotaDeUmEmprestimoDeUmCliente(@PathVariable Long id){
		return repositorioAgiota.findAgiotaByEmprestimoId(id);
	}
	
	//Requisições Genéricas para Manutenção do Sistema
	@GetMapping
	public List<Agiota> listarTodosAgiotas() {
		return repositorioAgiota.findAll();
	}

	@GetMapping("/buscar-por-email/{email}")
	public Agiota buscarAgiotaPorEmail(@PathVariable String email) {
		return repositorioAgiota.findByLoginEmail(email);
	}
	
	@GetMapping("/{id}")
	public Agiota buscarAgiotaPorId(@PathVariable Long id) {
		return repositorioAgiota.findById(id).orElse(null);
	}
	
	@PostMapping
	public Agiota cadastrarAgiota(@RequestBody Agiota agiota) {
		EmailDuplicadoException.validar(agiota.getLogin().getEmail(), repositorioLogin.findAll());
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
			usuarioAntigo.getLogin().setEmail(usuarioAtualizado.getLogin().getEmail());
			usuarioAntigo.getLogin().setSenha(usuarioAtualizado.getLogin().getSenha());
			usuarioAntigo.getEndereco().setCep(usuarioAtualizado.getEndereco().getCep());
			usuarioAntigo.getEndereco().setNumero(usuarioAtualizado.getEndereco().getCep());
			usuarioAntigo.getEndereco().setRua(usuarioAtualizado.getEndereco().getRua());
			usuarioAntigo.getEndereco().setBairro(usuarioAtualizado.getEndereco().getBairro());
			usuarioAntigo.getEndereco().setCidade(usuarioAtualizado.getEndereco().getCidade());
			usuarioAntigo.getEndereco().setEstado(usuarioAtualizado.getEndereco().getEstado());
            return repositorioAgiota.save(usuarioAntigo);
        } else {
            throw new DadoNaoEncontradoException("Agiota de id " + id + " não encontrado");
        }
	}
	
}
