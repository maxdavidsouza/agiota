package br.com.ufape.agiota.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
import br.com.ufape.agiota.model.negocios.Parcela;
import br.com.ufape.agiota.model.usuarios.Agiota;
import br.com.ufape.agiota.model.usuarios.Cliente;
import br.com.ufape.agiota.model.usuarios.Notificacao;
import br.com.ufape.agiota.repository.RepositorioAgiota;
import br.com.ufape.agiota.repository.RepositorioCliente;
import br.com.ufape.agiota.repository.RepositorioEmprestimo;
import br.com.ufape.agiota.repository.RepositorioNotificacao;

@RestController
@RequestMapping("/api")
public class ControllerEmprestimo {
	
	@Autowired
	private RepositorioEmprestimo repositorioEmprestimo;
	
	@Autowired
	private RepositorioAgiota repositorioAgiota;
	
	@Autowired
	private RepositorioCliente repositorioCliente;
	
	@Autowired
	private RepositorioNotificacao repositorioNotificacao;
	
	//Requisições Específicas para Interação entre Usuários do Sistema
	@PostMapping("/agiotas/{id}/emprestimos")
	public Emprestimo publicarEmprestimo(@RequestBody Emprestimo emprestimo, @PathVariable Long id) {
		emprestimo.setCredor(repositorioAgiota.findById(id).orElse(null));
		return repositorioEmprestimo.save(emprestimo);
	}
	
	@GetMapping("/agiotas/{id}/emprestimos")
	public List<Emprestimo> listarTodosEmprestimosDeUmAgiotaPorId(@PathVariable Long id) {
		return repositorioEmprestimo.findAllByCredorId(id);
	}
	
	@GetMapping("/agiotas/{id}/emprestimos/{id2}")
	public Emprestimo buscarUmEmprestimoDeUmAgiotaPorId(@PathVariable Long id, @PathVariable Long id2) {
		return repositorioEmprestimo.findByIdAndCredorId(id2, id);
	}
	
	@GetMapping("/agiotas/{id}/emprestimos-publicados")
	public List<Emprestimo> listarTodosEmprestimosPublicadosDeUmAgiotaPorId(@PathVariable Long id){
		return repositorioEmprestimo.findAllByEstadoAndCredorId("Aberto", id);
	}
	
	@GetMapping("/agiotas/{id}/emprestimos-publicados/{id2}")
	public Emprestimo buscarEmprestimoPublicadoDeUmAgiotaPorId(@PathVariable Long id, @PathVariable Long id2){
		return repositorioEmprestimo.findByEstadoAndCredorId("Aberto", id);
	}
	
	@PutMapping("/agiotas/{id}/emprestimos-publicados/{id2}")
	public Emprestimo editarEmprestimo(@RequestBody Emprestimo novoEmprestimo, @PathVariable Long id, @PathVariable Long id2) {
		Agiota agiotaDono = repositorioAgiota.findById(id).get();
		Emprestimo emprestimoAntigo = repositorioEmprestimo.findById(id2).get();
		
		if(!emprestimoAntigo.getEstado().equals("Aberto")) {
			throw new DadoNaoEncontradoException("Empréstimo de id " + id2 + " já está em transação.");
		}
		
		if(emprestimoAntigo.getCredor().equals(agiotaDono)) {
			int i = 0;
			emprestimoAntigo.setDevedor(novoEmprestimo.getDevedor());
			emprestimoAntigo.setEstado(novoEmprestimo.getEstado());
			emprestimoAntigo.setFormaDePagamento(novoEmprestimo.getFormaDePagamento());
			for (Parcela parcela : emprestimoAntigo.getParcelas()) {
	            parcela.setDataDePagamento(novoEmprestimo.getParcelas().get(i).getDataDePagamento());
	            parcela.setDataDeVencimento(novoEmprestimo.getParcelas().get(i).getDataDeVencimento());
	            parcela.setEstado(novoEmprestimo.getParcelas().get(i).getEstado());
	            parcela.setTaxaDeAtraso(novoEmprestimo.getParcelas().get(i).getTaxaDeAtraso());
	            parcela.setValorASerPago(novoEmprestimo.getParcelas().get(i).getValorASerPago());
	            parcela.setValorPago(novoEmprestimo.getParcelas().get(i).getValorPago());
	            i++;
	        }
			emprestimoAntigo.setTaxaTotal(novoEmprestimo.getTaxaTotal());
			emprestimoAntigo.setValorASerPago(novoEmprestimo.getValorASerPago());
			emprestimoAntigo.setValorEmprestado(novoEmprestimo.getValorEmprestado());
			return repositorioEmprestimo.save(emprestimoAntigo);
		} else {
            throw new DadoNaoEncontradoException("Empréstimo de id " + id2 + " ou Agiota de id "+id+" não encontrado");
        }
	}
	
	@PutMapping("/clientes/{id}/emprestimos-publicados/{id2}/firmar-emprestimo")
	public Emprestimo firmarEmprestimo(@PathVariable Long id, @PathVariable Long id2) {
		Cliente cliente = repositorioCliente.findById(id).orElse(null);
		Agiota agiota = repositorioAgiota.findAgiotaByEmprestimoId(id2);
		Emprestimo emprestimo = repositorioEmprestimo.findById(id2).orElse(null);
		if(emprestimo.equals(null) | cliente.equals(null) | agiota.equals(null))
			throw new DadoNaoEncontradoException("Empréstimo de id " + id2 + " ou Cliente de id "+id+" não encontrado");
		
		if(emprestimo.getEstado().equals("Aberto")) {
			Notificacao notificacao = new Notificacao(cliente.getNome() + " (" + cliente.getId() + ") deseja firmar o empréstimo (" + emprestimo.getId() +") de " + emprestimo.getValorEmprestado() + " com você.",cliente,agiota,LocalDateTime.now()); 
			emprestimo.setDevedor(repositorioCliente.findById(id).get());
			emprestimo.setEstado("Em acordo");
			repositorioNotificacao.save(notificacao);
			return repositorioEmprestimo.save(emprestimo);
		} else {
			throw new DadoNaoEncontradoException("Empréstimo de id " + id2 +" não existe ou não está público.");
		}
	}
	
	@PutMapping("/agiotas/{id}/emprestimos-publicados/{id2}/firmar-emprestimo")
	public Emprestimo aceitarEmprestimo(@PathVariable Long id, @PathVariable Long id2) {
		Emprestimo emprestimo = repositorioEmprestimo.findById(id2).get();
		Agiota agiota = repositorioAgiota.findAgiotaByEmprestimoId(id2);
		Cliente cliente = emprestimo.getDevedor();
		if(emprestimo.getEstado().equals("Em acordo")) {
			Notificacao notificacao = new Notificacao(agiota.getNome() + " (" + agiota.getId() + ") aceitou te oferecer o empréstimo (" + id2 +") de " + emprestimo.getValorEmprestado() +".", agiota, cliente, LocalDateTime.now()); 
			emprestimo.setEstado("Fechado");
			emprestimo.inicializarDatasDeVencimento();
			repositorioNotificacao.save(notificacao);
			return repositorioEmprestimo.save(emprestimo);
		} else {
			throw new DadoNaoEncontradoException("Empréstimo de id " + id2 + " ou Agiota de id "+id+" não encontrado");
		}
	}
	
	@DeleteMapping("/agiotas/{id}/emprestimos/{id2}")
	public void removerUmEmprestimoDeUmCredorPorId(@PathVariable Long id, @PathVariable Long id2) {
		Emprestimo emprestimo = repositorioEmprestimo.findById(id2).orElse(null);
		if(emprestimo != null && emprestimo.getEstado().equals("Aberto"))
				repositorioEmprestimo.deleteByIdAndCredorId(id2, id);
		else {
			throw new DadoNaoEncontradoException("Empréstimo de id " + id2 + " ou Cliente de id "+id+" não encontrado");
		}
	}
	
	@GetMapping("/clientes/{id}/emprestimos")
	public List<Emprestimo> listarTodosEmprestimosDeUmClientePorId(@PathVariable Long id) {
		return repositorioEmprestimo.findAllByDevedorId(id);
	}
	
	@GetMapping("/clientes/{id}/emprestimos/{id2}")
	public Emprestimo buscarUmEmprestimoDeUmClientePorId(@PathVariable Long id, @PathVariable Long id2) {
		return repositorioEmprestimo.findByIdAndDevedorId(id2, id);
	}
	
	//Requisições Genéricas para Manutenção do Sistema
	@GetMapping("/emprestimos-publicados")
	public List<Emprestimo> listarTodosEmprestimosPublicados(){
		return repositorioEmprestimo.findAllByEstado("Aberto");
	}
	
	@GetMapping("/emprestimos-publicados/{id}")
	public Emprestimo buscarUmEmprestimoPublicado(@PathVariable Long id){
		List<Emprestimo> emprestimosPublicados = listarTodosEmprestimosPublicados();
		Emprestimo emprestimoPublicado = repositorioEmprestimo.findById(id).orElse(null);
		if(emprestimosPublicados.contains(emprestimoPublicado)) {
			return emprestimoPublicado;
		} else {
			throw new DadoNaoEncontradoException("Empréstimo de id " + id + " não encontrado");
		}
	}
	
	@GetMapping("/emprestimos/buscar-por-estado/{estado}")
	public List<Emprestimo> listarTodosEmprestimosPorEstado(@PathVariable String estado) {
		return repositorioEmprestimo.findAllByEstado(estado);
	}
	
	@GetMapping("/emprestimos/buscar-por-valor-emprestado/{valorMin}/{valorMax}")
	public List<Emprestimo> listarTodosEmprestimosPorValorEmprestadoMinEMax(@PathVariable BigDecimal valorMin, @PathVariable BigDecimal valorMax) {
		return repositorioEmprestimo.findAllByValorEmprestadoBetween(valorMin, valorMax);
	}
	
}
