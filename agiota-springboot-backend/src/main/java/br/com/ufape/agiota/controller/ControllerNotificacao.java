package br.com.ufape.agiota.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufape.agiota.model.negocios.Parcela;
import br.com.ufape.agiota.model.usuarios.Agiota;
import br.com.ufape.agiota.model.usuarios.Cliente;
import br.com.ufape.agiota.model.usuarios.Notificacao;
import br.com.ufape.agiota.repository.RepositorioAgiota;
import br.com.ufape.agiota.repository.RepositorioCliente;
import br.com.ufape.agiota.repository.RepositorioNotificacao;
import br.com.ufape.agiota.repository.RepositorioParcela;

@RestController
@RequestMapping("/api")
public class ControllerNotificacao {
	
	@Autowired
	private RepositorioNotificacao repositorioNotificacao;
	
	@Autowired
	private RepositorioAgiota repositorioAgiota;
	
	@Autowired
	private RepositorioCliente repositorioCliente;
	
	@Autowired
	private RepositorioParcela repositorioParcela;
	
	//Requisições Específicas para Interação entre Usuários do Sistema
	@PostMapping("/agiotas/{id}/enviar-mensagem/clientes/{id2}")
	public Notificacao enviarNotificacao(@RequestBody Notificacao notificacao, @PathVariable Long id, @PathVariable Long id2) {
		Agiota agiota = repositorioAgiota.findById(id).get();
		Cliente cliente = repositorioCliente.findById(id2).get();
		notificacao.setDestinatario(cliente);
		notificacao.setRemetente(agiota);
		notificacao.setDataEHoraDeEnvio(LocalDateTime.now());
		return repositorioNotificacao.save(notificacao);
	}
	
	@PostMapping("/clientes/{id}/emprestimos/{id2}/parcelas/{id3}/gerar-lembrete")
	public Notificacao gerarLembrete(@RequestBody Notificacao notificacao, @PathVariable Long id, @PathVariable Long id3) {
		Cliente cliente = repositorioCliente.findById(id).get();
		Parcela parcela = repositorioParcela.findById(id3).get();
		notificacao.setDestinatario(cliente);
		notificacao.setRemetente(cliente);
		notificacao.setTexto("Lembre-se de pagar sua parcela que se vence "+parcela.getDataDeVencimento());
		return repositorioNotificacao.save(notificacao);
	}
	
	@GetMapping("/agiotas/{id}/mensagens-recebidas")
	public List<Notificacao> listarNotificacoesRecebidasPorUmAgiota(@PathVariable Long id) {
		return repositorioNotificacao.findAllByDestinatarioId(id);
	}
	
	@GetMapping("/agiotas/{id}/mensagens-enviadas")
	public List<Notificacao> listarNotificacoesEnviadasPorUmAgiota(@PathVariable Long id) {
		return repositorioNotificacao.findAllByRemetenteId(id);
	}
	
	@GetMapping("/clientes/{id}/mensagens-recebidas")
	public List<Notificacao> listarNotificacoesRecebidasPorUmCliente(@PathVariable Long id) {
		return repositorioNotificacao.findAllByDestinatarioIdAndRemetenteIdIsNot(id,id);
	}
	
	@GetMapping("/clientes/{id}/lembretes")
	public List<Notificacao> listarLembretesDeUmCliente(@PathVariable Long id) {
		return repositorioNotificacao.findAllByDestinatarioIdAndRemetenteId(id,id);
	}
	
	@GetMapping("/clientes/{id}/mensagens-enviadas")
	public List<Notificacao> listarNotificacoesEnviadasPorUmCliente(@PathVariable Long id) {
		return repositorioNotificacao.findAllByRemetenteId(id);
	}
	
	//Requisições Genéricas para Manutenção do Sistema
	@GetMapping("/mensagens")
	public List<Notificacao> listarTodasNotificacaoes() {
		return repositorioNotificacao.findAll();
	}
	
	@DeleteMapping("/mensagens/{id2}")
	public void deletarUmaNotificacaoa(@PathVariable Long id) {
		repositorioNotificacao.deleteById(id);
	}

}
