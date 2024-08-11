package br.com.ufape.agiota.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufape.agiota.model.negocios.Pagamento;
import br.com.ufape.agiota.repository.RepositorioCliente;
import br.com.ufape.agiota.repository.RepositorioPagamento;
import br.com.ufape.agiota.repository.RepositorioParcela;

@RestController
@RequestMapping("/api")
public class ControllerPagamento {
	
	@Autowired
	private RepositorioPagamento repositorioPagamento;
	
	@Autowired
	private RepositorioCliente repositorioCliente;
	
	@Autowired
	private RepositorioParcela repositorioParcela;
	
	//Requisições Específicas para Interação entre Usuários do Sistema
	@GetMapping("/clientes/{id}/pagamentos")
	public List<Pagamento> listarTodosPagamentosDeUmCliente(@PathVariable Long id){
		return repositorioPagamento.findByPagadorId(id);
	}
	
	@PostMapping("clientes/{id}/emprestimos/{id2}/parcelas/{id3}/pagamentos")
	public Pagamento efetuarPagamento(@RequestBody Pagamento pagamento, @PathVariable Long id, @PathVariable Long id2, @PathVariable Long id3) {
		pagamento.setPagador(repositorioCliente.findById(id).get());
		pagamento.setParcela(repositorioParcela.findById(id3).get());
		pagamento.pagarParcela(repositorioParcela.findById(id3).get());
		return repositorioPagamento.save(pagamento);
	}
	
	@GetMapping("/clientes/{id}/emprestimos/{id2}/parcelas/{id3}/pagamentos")
	public List<Pagamento> listarTodosPagamentosDeUmaParcelaDeUmCliente(@PathVariable Long id, @PathVariable Long id3){
		return repositorioPagamento.findByPagadorIdAndParcelaId(id, id3);
	}
	
	@GetMapping("/clientes/{id}/emprestimos/{id2}/parcelas/{id3}/pagamentos/{id4}")
	public Pagamento buscarUmPagamentoDeUmaParcelaDeUmCliente(@PathVariable Long id, @PathVariable Long id3, @PathVariable Long id4){
		return repositorioPagamento.findByPagadorIdAndParcelaIdAndId(id, id3, id4);
	}
}
