package br.com.ufape.agiota.model.usuarios;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
	
	public Notificacao(){}

	public Notificacao(String texto, Usuario remetente, Usuario destinatario) {
		this.texto = texto;
		this.remetente = remetente;
		this.destinatario = destinatario;
	}

	public String getTexto() {
		return texto;
	}
	public void setTexto(String texto) {
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
