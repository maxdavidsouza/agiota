package br.com.ufape.agiota.exceptions;

import java.math.BigDecimal;

public class CampoValidator {

	public static void validar(String campo, String nomeDoCampo) throws CampoInvalidoException {
		if (campo == null) {
            throw new CampoInvalidoException("O campo '" + nomeDoCampo + "' não pode ser nulo.");
        }
        if (campo.trim().isEmpty()) {
            throw new CampoInvalidoException("O campo '" + nomeDoCampo + "' não pode estar vazio ou preenchido apenas com espaços.");
        }
        if (nomeDoCampo.equals("nota") && Float.parseFloat(campo) < 0) {
        	throw new CampoInvalidoException("O campo '" + nomeDoCampo + "' não pode ter valor abaixo de zero.");
        }
        if (nomeDoCampo.equals("big_decimal")) {
        	BigDecimal valor = new BigDecimal(campo);
        	if(valor.compareTo(BigDecimal.ZERO) < 0)
        		throw new CampoInvalidoException("O campo '" + nomeDoCampo + "' não pode ter valor abaixo de zero.");
        }
        if(nomeDoCampo.equals("taxa") && Float.parseFloat(campo) >= 1 && Float.parseFloat(campo) <= 0) {
        	throw new CampoInvalidoException("O campo '" + nomeDoCampo + "' não pode ter valor abaixo de zero ou acima de 1.");
        }
        if (nomeDoCampo.equals("telefone") && !campo.matches("[0-9]+")) {
        	throw new CampoInvalidoException("O campo '" + nomeDoCampo + "' não pode ter letras ou simbolos.");
        }
        if (nomeDoCampo.equals("estado_emprestimo") && !(campo.equals("Em aberto") || 
        	campo.equals("Em acordo") || campo.equals("Fechado") ||
        	campo.equals("Pago") || campo.equals("Parcialmente pago"))) {
        	throw new CampoInvalidoException("O campo '" + nomeDoCampo + "' só pode conter estados específicos.");
        }
        if (nomeDoCampo.equals("estado_parcela") && !(campo.equals("Aberta") || 
        	campo.equals("Vencida") || campo.equals("Parcialmente paga") ||
        	campo.equals("Totalmente paga"))) {
        	throw new CampoInvalidoException("O campo '" + nomeDoCampo + "' só pode conter estados específicos.");
        }
        if (nomeDoCampo.equals("forma_de_pagamento") && !(campo.equals("Dinheiro") || 
        		campo.equals("Cartão") || campo.equals("Móveis"))) {
        	throw new CampoInvalidoException("O campo '" + nomeDoCampo + "' só pode conter estados específicos.");
        }
        if (nomeDoCampo.equals("email") && !campo.matches("[0-9]+")) {
        	throw new CampoInvalidoException("O campo '" + nomeDoCampo + "' não pode ter letras ou simbolos.");
        }
	}
}
