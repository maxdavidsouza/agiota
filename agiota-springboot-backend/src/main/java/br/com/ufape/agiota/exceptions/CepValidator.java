package br.com.ufape.agiota.exceptions;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CepValidator {
	private static final String CEP_PATTERN = "^[0-9]{5}-[0-9]{3}$";

	private static final Pattern pattern = Pattern.compile(CEP_PATTERN);

	public static void validar(String cep) throws CepInvalidoException {
		Matcher matcher = pattern.matcher(cep);
		if (!matcher.matches()) {
			throw new CepInvalidoException("Cep inválido: " + cep);
		}
	}
}
