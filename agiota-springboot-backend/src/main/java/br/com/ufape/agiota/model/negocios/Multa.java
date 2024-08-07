package br.com.ufape.agiota.model.negocios;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import br.com.ufape.agiota.exceptions.CampoValidator;

@Entity
public class Multa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private BigDecimal valor;

	public Multa(){}
	
	public Multa(BigDecimal valor) {
		CampoValidator.validar(valor.toString(), "big_decimal");
		this.valor = valor;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		CampoValidator.validar(valor.toString(), "big_decimal");
		this.valor = valor;
	}
	
	public long getId() {
		return id;
	}
	
}
