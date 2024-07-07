package br.com.ufape.agiota.model.usuarios;

public class Notificacao {
	private long id;
	private String texto;
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
