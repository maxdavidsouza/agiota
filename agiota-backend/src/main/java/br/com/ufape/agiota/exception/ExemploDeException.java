package br.com.ufape.agiota.exception;

public class ExemploDeException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	private String mensagem;
	ExemploDeException(String mensagem){
		this.mensagem = mensagem;
	}
	public String getMensagem() {
		return mensagem;
	}
}
