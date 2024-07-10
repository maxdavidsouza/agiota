package br.com.ufape.agiota.exceptions;

import java.time.LocalDate;
import java.time.Period;

public class DataDeNascimentoValidator {
	
	public static void validar(LocalDate dataDeNascimento) throws DataDeNascimentoInvalidaException {
        LocalDate hoje = LocalDate.now();
        int idade = Period.between(dataDeNascimento, hoje).getYears();

        if (idade < 18) {
            throw new DataDeNascimentoInvalidaException("A idade deve ser maior ou igual a 18 anos.");
        }

        if (idade > 120) {
            throw new DataDeNascimentoInvalidaException("A idade deve ser menor ou igual a 120 anos.");
        }
    }
}
