package br.com.ufape.agiota.exceptions;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailValidator {
	private static final String EMAIL_PATTERN = "^[A-Za-z0-9+_.-]+@(.+)$";

	private static final Pattern pattern = Pattern.compile(EMAIL_PATTERN);

	public static void validar(String email) throws EmailInvalidoException {
		Matcher matcher = pattern.matcher(email);
		if (!matcher.matches()) {
			throw new EmailInvalidoException("E-mail inválido: " + email);
		}
	}
}
