package br.com.ufape.agiota.model.negocios;

import java.math.BigDecimal;
import java.util.List;

public class Emprestimo {
	private long id;
	private BigDecimal valorEmprestado;
	private BigDecimal valorASerPago;
	private BigDecimal taxaTotal;
	private String formaDePagamento;
	private String estado;
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
