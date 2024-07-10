package br.com.ufape.agiota.model.usuarios;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import br.com.ufape.agiota.exceptions.CampoValidator;

@Entity
public class Notificacao {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(columnDefinition = "TEXT")
	private String texto;
	
	@ManyToOne
	@JoinColumn(nullable = false)
	private Usuario remetente;

	@ManyToOne
	@JoinColumn(nullable = false)
	private Usuario destinatario;
	
	@Column(name = "data_e_hora_de_envio")
	private LocalDateTime DataEHoraDeEnvio;
	
	public Notificacao(){}

	public Notificacao(String texto, Usuario remetente, Usuario destinatario, LocalDateTime DataEHoraDeEnvio) {
		CampoValidator.validar(texto, "texto");
		this.texto = texto;
		this.remetente = remetente;
		this.destinatario = destinatario;
		this.DataEHoraDeEnvio = DataEHoraDeEnvio;
	}

	public String getTexto() {
		return texto;
	}
	public void setTexto(String texto) {
		CampoValidator.validar(texto, "texto");
		this.texto = texto;
	}
	
	public Usuario getRemetente() {
		return remetente;
	}

	public void setRemetente(Usuario remetente) {
		this.remetente = remetente;
	}

	public Usuario getDestinatario() {
		return destinatario;
	}
	public void setDestinatario(Usuario destinatario) {
		this.destinatario = destinatario;
	}

}
