package br.com.ufape.agiota.controller;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufape.agiota.model.negocios.Parcela;
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
	
	@PostMapping("/agiotas/{id}/enviar-mensagem/clientes/{id2}")
	public Notificacao enviarNotificacao(@RequestBody Notificacao notificacao, @PathVariable Long id, @PathVariable Long id2) {
		notificacao.setRemetente(repositorioAgiota.findById(id).get());
		notificacao.setDestinatario(repositorioCliente.findById(id2).get());
		notificacao.setDataEHoraDeEnvio(LocalDateTime.now());
		return repositorioNotificacao.save(notificacao);
	}
	
	@PostMapping("/clientes/{id}/emprestimos/{id2}/parcelas/{id3}/gerar-lembrete")
	public Notificacao gerarNotificacao(@PathVariable Long id, @PathVariable Long id2, @PathVariable Long id3) {
		Cliente cliente = repositorioCliente.findById(id).get();
		Parcela parcela = repositorioParcela.findByEmprestimoIdAndId(id2, id3);
		return repositorioNotificacao.save(cliente.gerarLembrete(parcela,parcela.getDataDeVencimento()));
	}
	
	@DeleteMapping("/notificacao/{id}")
	public void deletarNotificacao(@PathVariable Long id) {
		repositorioNotificacao.deleteById(id);
	}

}
