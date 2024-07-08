package br.com.ufape.agiota.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class DadoNaoEncontradoException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public DadoNaoEncontradoException(String mensagem) {
        super(mensagem);
    }
}
