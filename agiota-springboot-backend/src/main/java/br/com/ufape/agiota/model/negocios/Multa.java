package br.com.ufape.agiota.model.negocios;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Multa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private BigDecimal valor;

	public Multa(){}
	
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
