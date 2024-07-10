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
import br.com.ufape.agiota.model.negocios.Emprestimo;
import br.com.ufape.agiota.model.usuarios.Agiota;
import br.com.ufape.agiota.repository.RepositorioAgiota;
import br.com.ufape.agiota.repository.RepositorioCliente;
import br.com.ufape.agiota.repository.RepositorioEmprestimo;

@RestController
@RequestMapping("/api")
public class ControllerEmprestimo {
	
	@Autowired
	RepositorioEmprestimo repositorioEmprestimo;
	
	@Autowired
	RepositorioAgiota repositorioAgiota;
	
	@Autowired
	RepositorioCliente repositorioCliente;
	
	@GetMapping("/agiotas/{id}/emprestimos")
	public List<Emprestimo> listarTodosEmprestimosDeUmAgiotaPorId(@PathVariable Long id) {
		return repositorioEmprestimo.findAllByCredorId(id);
	}
	
	@GetMapping("/agiotas/{id}/emprestimos/{id2}")
	public List<Emprestimo> listarUmEmprestimoDeUmAgiotaPorId(@PathVariable Long id, @PathVariable Long id2) {
		return repositorioEmprestimo.getByIdAndCredorId(id2, id);
	}
	
	@PostMapping("/agiotas/{id}/emprestimos")
	public Emprestimo publicarEmprestimo(@RequestBody Emprestimo emprestimo, @PathVariable Long id) {
		emprestimo.setCredor(repositorioAgiota.findById(id).orElse(null));
		return repositorioEmprestimo.save(emprestimo);
	}
	
	@PutMapping("/agiotas/{id}/emprestimos/{id2}")
	public Emprestimo editarEmprestimo(@RequestBody Emprestimo novoEmprestimo, @PathVariable Long id, @PathVariable Long id2) {
		Agiota agiotaDono = repositorioAgiota.findById(id).get();
		Emprestimo emprestimoAntigo = repositorioEmprestimo.findById(id2).get();
		if(emprestimoAntigo.getEstado().equals("Fechado") || emprestimoAntigo.getEstado().equals("Pago")
				|| emprestimoAntigo.getEstado().equals("Parcialmente pago")) {
			return null;
		}
		else if(agiotaDono != null && emprestimoAntigo.getCredor().equals(agiotaDono)) {
			emprestimoAntigo.setCredor(novoEmprestimo.getCredor());
			emprestimoAntigo.setDevedor(novoEmprestimo.getDevedor());
			emprestimoAntigo.setEstado(novoEmprestimo.getEstado());
			emprestimoAntigo.setFormaDePagamento(novoEmprestimo.getFormaDePagamento());
			emprestimoAntigo.setParcelas(novoEmprestimo.getParcelas());
			emprestimoAntigo.setTaxaTotal(novoEmprestimo.getTaxaTotal());
			emprestimoAntigo.setValorASerPago(novoEmprestimo.getValorASerPago());
			emprestimoAntigo.setValorEmprestado(novoEmprestimo.getValorEmprestado());
			return repositorioEmprestimo.save(emprestimoAntigo);
		} else {
            throw new DadoNaoEncontradoException("Empréstimo de id " + id2 + " ou Agiota de id "+id+" não encontrado");
        }
	}
	
	@DeleteMapping("/agiotas/{id}/emprestimos/{id2}")
	public void removerEmprestimo(@PathVariable Long id, @PathVariable Long id2) {
		Agiota agiotaDono = repositorioAgiota.findById(id).get();
		if(agiotaDono != null && repositorioEmprestimo.findById(id2).get().getCredor().equals(agiotaDono))
			repositorioEmprestimo.deleteById(id2);
	}
	
	@GetMapping("/clientes/{id}/emprestimos")
	public List<Emprestimo> listarTodosEmprestimosDeUmClientePorId(@PathVariable Long id) {
		return repositorioEmprestimo.findAllByDevedorId(id);
	}
	
	@GetMapping("/clientes/{id}/emprestimos/{id2}")
	public List<Emprestimo> listarUmEmprestimoDeUmClientePorId(@PathVariable Long id, @PathVariable Long id2) {
		return repositorioEmprestimo.getByIdAndDevedorId(id2, id);
	}
	
}
