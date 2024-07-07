package br.com.ufape.agiota.model.negocios;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Emprestimo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private BigDecimal valorEmprestado;
	private BigDecimal valorASerPago;
	private BigDecimal taxaTotal;
	private String formaDePagamento;
	private String estado;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<Parcela> parcelas;
	
	public Emprestimo(BigDecimal valorEmprestado, BigDecimal valorASerPago, BigDecimal taxaTotal, String formaDePagamento, String estado) {
		this.valorEmprestado = valorEmprestado;
		this.valorASerPago = valorASerPago;
		this.taxaTotal = taxaTotal;
		this.formaDePagamento = formaDePagamento;
		this.estado = estado;
	}
	
	public BigDecimal getValorEmprestado() {
		return valorEmprestado;
	}
	public void setValorEmprestado(BigDecimal valorEmprestado) {
		this.valorEmprestado = valorEmprestado;
	}
	public BigDecimal getValorASerPago() {
		return valorASerPago;
	}
	public void setValorASerPago(BigDecimal valorASerPago) {
		this.valorASerPago = valorASerPago;
	}
	public BigDecimal getTaxaTotal() {
		return taxaTotal;
	}
	public void setTaxaTotal(BigDecimal taxaTotal) {
		this.taxaTotal = taxaTotal;
	}
	public String getFormaDePagamento() {
		return formaDePagamento;
	}
	public void setFormaDePagamento(String formaDePagamento) {
		this.formaDePagamento = formaDePagamento;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	
}
