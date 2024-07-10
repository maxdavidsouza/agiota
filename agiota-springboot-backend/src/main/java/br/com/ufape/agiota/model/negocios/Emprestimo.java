package br.com.ufape.agiota.model.negocios;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import br.com.ufape.agiota.exceptions.CampoValidator;
import br.com.ufape.agiota.model.usuarios.Agiota;
import br.com.ufape.agiota.model.usuarios.Cliente;

@Entity
public class Emprestimo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private BigDecimal valorEmprestado;
	
	@Column(name = "valor_a_ser_pago")
	private BigDecimal valorASerPago;
	
	private Float taxaTotal;
	private String formaDePagamento;
	private String estado;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(nullable = false)
	private Agiota credor;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(nullable = true)
	private Cliente devedor;

	
	@OneToMany(mappedBy = "emprestimo", cascade = CascadeType.ALL)
	private List<Parcela> parcelas;

	public Emprestimo(){}
	
	public Emprestimo(BigDecimal valorEmprestado, BigDecimal valorASerPago, Float taxaTotal, String formaDePagamento, String estado, Cliente devedor, Agiota credor, List<Parcela> parcelas) {
		CampoValidator.validar(valorEmprestado.toString(), "big_decimal");
		CampoValidator.validar(valorEmprestado.toString(), "big_decimal");
		CampoValidator.validar(String.valueOf(taxaTotal), "taxa");
		CampoValidator.validar(formaDePagamento, "forma_de_pagamento");
		CampoValidator.validar(estado, "estado_emprestimo");
		this.valorEmprestado = valorEmprestado;
		this.valorASerPago = valorASerPago;
		this.taxaTotal = taxaTotal;
		this.formaDePagamento = formaDePagamento;
		this.estado = estado;
		this.parcelas = parcelas;
		for (Parcela parcela : parcelas) {
		    if (parcela != null) {
		        parcela.setEmprestimo(this);
		    }
		}
	}

	public BigDecimal getValorEmprestado() {
		return valorEmprestado;
	}
	public void setValorEmprestado(BigDecimal valorEmprestado) {
		CampoValidator.validar(valorEmprestado.toString(), "big_decimal");
		this.valorEmprestado = valorEmprestado;
	}
	public BigDecimal getValorASerPago() {
		return valorASerPago;
	}
	public void setValorASerPago(BigDecimal valorASerPago) {
		CampoValidator.validar(valorEmprestado.toString(), "big_decimal");
		this.valorASerPago = valorASerPago;
	}
	public Float getTaxaTotal() {
		return taxaTotal;
	}
	public void setTaxaTotal(Float taxaTotal) {
		CampoValidator.validar(String.valueOf(taxaTotal), "taxa");
		this.taxaTotal = taxaTotal;
	}
	public String getFormaDePagamento() {
		return formaDePagamento;
	}
	public void setFormaDePagamento(String formaDePagamento) {
		CampoValidator.validar(formaDePagamento, "forma_de_pagamento");
		this.formaDePagamento = formaDePagamento;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		CampoValidator.validar(estado, "estado_emprestimo");
		this.estado = estado;
	}

	public Agiota getCredor() {
		return credor;
	}

	public void setCredor(Agiota credor) {
		this.credor = credor;
	}

	public Cliente getDevedor() {
		return devedor;
	}

	public void setDevedor(Cliente devedor) {
		this.devedor = devedor;
	}

	public List<Parcela> getParcelas() {
		return parcelas;
	}

	public void setParcelas(List<Parcela> parcelas) {
		this.parcelas = parcelas;
		for (Parcela parcela : parcelas) {
		    if (parcela != null) {
		        parcela.setEmprestimo(this);
		    }
		}
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	

}
