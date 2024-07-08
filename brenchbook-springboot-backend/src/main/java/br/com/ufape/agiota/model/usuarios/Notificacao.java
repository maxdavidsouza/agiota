package br.com.ufape.agiota.model.usuarios;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Notificacao {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String texto;

	@ManyToOne
	private Usuario destinatario;

	public Notificacao(String texto, Usuario destinatario) {
		this.texto = texto;
		this.destinatario = destinatario;
	}

	public String getTexto() {
		return texto;
	}
	public void setTexto(String texto) {
		this.texto = texto;
	}
	public Usuario getDestinatario() {
		return destinatario;
	}
	public void setDestinatario(Usuario destinatario) {
		this.destinatario = destinatario;
	}

}
