package br.com.ufape.agiota.model.negocios;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Parcela {
	private long id;
	private BigDecimal valorASerPago;
	private BigDecimal valorPago;
	private BigDecimal taxaDeAtraso;
	private LocalDateTime dataDePagamento;
	private LocalDateTime dataDeVencimento;
	private String estado;
	private Multa multa;
	
	public Parcela(BigDecimal valorASerPago, BigDecimal valorPago, BigDecimal taxaDeAtraso,
			LocalDateTime dataDePagamento, LocalDateTime dataDeVencimento, String estado) {
		this.valorASerPago = valorASerPago;
		this.valorPago = valorPago;
		this.taxaDeAtraso = taxaDeAtraso;
		this.dataDePagamento = dataDePagamento;
		this.dataDeVencimento = dataDeVencimento;
		this.estado = estado;
	}
	
	public BigDecimal getValorASerPago() {
		return valorASerPago;
	}
	public void setValorASerPago(BigDecimal valorASerPago) {
		this.valorASerPago = valorASerPago;
	}
	public BigDecimal getValorPago() {
		return valorPago;
	}
	public void setValorPago(BigDecimal valorPago) {
		this.valorPago = valorPago;
	}
	public BigDecimal getTaxaDeAtraso() {
		return taxaDeAtraso;
	}
	public void setTaxaDeAtraso(BigDecimal taxaDeAtraso) {
		this.taxaDeAtraso = taxaDeAtraso;
	}
	public LocalDateTime getDataDePagamento() {
		return dataDePagamento;
	}
	public void setDataDePagamento(LocalDateTime dataDePagamento) {
		this.dataDePagamento = dataDePagamento;
	}
	public LocalDateTime getDataDeVencimento() {
		return dataDeVencimento;
	}
	public void setDataDeVencimento(LocalDateTime dataDeVencimento) {
		this.dataDeVencimento = dataDeVencimento;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	
}
