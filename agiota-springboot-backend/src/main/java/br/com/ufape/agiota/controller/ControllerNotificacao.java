package br.com.ufape.agiota.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufape.agiota.model.usuarios.Notificacao;
import br.com.ufape.agiota.repository.RepositorioAgiota;
import br.com.ufape.agiota.repository.RepositorioCliente;
import br.com.ufape.agiota.repository.RepositorioNotificacao;

@RestController
@RequestMapping("/api")
public class ControllerNotificacao {
	
	@Autowired
	private RepositorioNotificacao repositorioNotificacao;
	
	@Autowired
	private RepositorioAgiota repositorioAgiota;
	
	@Autowired
	private RepositorioCliente repositorioCliente;
	
	@PostMapping("/agiota/{id}/enviar-mensagem/cliente/{id2}")
	public Notificacao enviarNotificacao(@RequestBody Notificacao notificacao, @PathVariable Long id, @PathVariable Long id2) {
		notificacao.setRemetente(repositorioAgiota.findById(id).get());
		notificacao.setDestinatario(repositorioCliente.findById(id).get());
		return repositorioNotificacao.save(notificacao);
	}
	
	@PostMapping("/cliente/{id}")
	public Notificacao enviarNotificacao(@RequestBody Notificacao notificacao, @PathVariable Long id) {
		notificacao.setRemetente(repositorioCliente.findById(id).get());
		notificacao.setDestinatario(repositorioCliente.findById(id).get());
		return repositorioNotificacao.save(notificacao);
	}
	
	@PostMapping("/notificacao/{id}")
	public void deletarNotificacao(@PathVariable Long id) {
		repositorioNotificacao.deleteById(id);
	}
	
	

}
