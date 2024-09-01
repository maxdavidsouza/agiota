package br.com.ufape.agiota.model.usuarios;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.ufape.agiota.exceptions.CampoValidator;

@Entity
public class Notificacao {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(columnDefinition = "TEXT")
	private String texto;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(nullable = false)
	private Usuario remetente;

	@JsonIgnore
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

	public LocalDateTime getDataEHoraDeEnvio() {
		return DataEHoraDeEnvio;
	}

	public void setDataEHoraDeEnvio(LocalDateTime dataEHoraDeEnvio) {
		DataEHoraDeEnvio = dataEHoraDeEnvio;
	}

	public long getId() {
		return id;
	}

}
