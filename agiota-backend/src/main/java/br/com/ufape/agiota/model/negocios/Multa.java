package br.com.ufape.agiota.model.negocios;

import java.math.BigDecimal;

public class Multa {
	private BigDecimal valor;

	public Multa(BigDecimal valor) {
		this.valor = valor;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}
	
}
