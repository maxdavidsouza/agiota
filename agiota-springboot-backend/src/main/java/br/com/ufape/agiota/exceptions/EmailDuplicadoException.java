package br.com.ufape.agiota.exceptions;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import br.com.ufape.agiota.model.autenticacao.Login;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
public class EmailDuplicadoException extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public static void validar(String email, List<Login> logins) throws EmailInvalidoException {
		if(logins == null)
			return;
		for (Login login : logins) {
			    if (login.getEmail().equals(email)) {
			    	throw new EmailInvalidoException("E-mail já utilizado " + email);
			    }
		}
	}
}
