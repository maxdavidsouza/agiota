package br.com.ufape.agiota.exceptions;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SenhaValidator {
	private static final String SENHA_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
    private static final Pattern SENHA_PATTERN = Pattern.compile(SENHA_REGEX);
    
    public static void validar(String senha) throws SenhaInvalidaException {
        Matcher matcher = SENHA_PATTERN.matcher(senha);
        if (!matcher.matches()) {
            throw new SenhaInvalidaException("Senha inválida: deve ter no mínimo 8 caracteres, incluindo pelo menos um caractere maiúsculo, um minúsculo, um número e um caractere especial.");
        }
    }

}
