package br.com.ufape.agiota.model.negocios;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.ufape.agiota.exceptions.CampoValidator;

@Entity
public class Parcela {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "valor_a_ser_pago")
	private BigDecimal valorASerPago;
	
	private BigDecimal valorPago;
	private Float taxaDeAtraso;
	private LocalDateTime dataDePagamento;
	private LocalDateTime dataDeVencimento;
	private String estado;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "emprestimo_id", nullable = false)
	private Emprestimo emprestimo;
	
	@JsonIgnore
	@OneToMany(mappedBy = "parcela", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Pagamento> pagamentos;
	
	@OneToOne(cascade = CascadeType.ALL)
	private Multa multa;
	
	public Parcela(){}

	public Parcela(BigDecimal valorASerPago, BigDecimal valorPago, Float taxaDeAtraso,
			LocalDateTime dataDePagamento, LocalDateTime dataDeVencimento, String estado) {
		CampoValidator.validar(valorASerPago.toString(), "big_decimal");
		CampoValidator.validar(valorPago.toString(), "big_decimal");
		CampoValidator.validar(String.valueOf(taxaDeAtraso), "taxa");
		CampoValidator.validar(estado, "estado_parcela");
		this.valorASerPago = valorASerPago;
		this.valorPago = valorPago;
		this.taxaDeAtraso = taxaDeAtraso;
		this.dataDePagamento = dataDePagamento;
		this.dataDeVencimento = dataDeVencimento;
		this.estado = estado;
	}
	
	public long getId() {
		return id;
	}

	public BigDecimal getValorASerPago() {
		return valorASerPago;
	}
	public void setValorASerPago(BigDecimal valorASerPago) {
		CampoValidator.validar(valorASerPago.toString(), "big_decimal");
		this.valorASerPago = valorASerPago;
	}
	public BigDecimal getValorPago() {
		return valorPago;
	}
	public void setValorPago(BigDecimal valorPago) {
		CampoValidator.validar(valorPago.toString(), "big_decimal");
		this.valorPago = valorPago;
	}
	public Float getTaxaDeAtraso() {
		return taxaDeAtraso;
	}
	public void setTaxaDeAtraso(Float taxaDeAtraso) {
		CampoValidator.validar(String.valueOf(taxaDeAtraso), "taxa");
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
		CampoValidator.validar(estado, "estado_parcela");
		this.estado = estado;
	}

	public Emprestimo getEmprestimo() {
		return emprestimo;
	}

	public void setEmprestimo(Emprestimo emprestimo) {
		this.emprestimo = emprestimo;
	}

	public Multa getMulta() {
		return multa;
	}

	public void setMulta(Multa multa) {
		this.multa = multa;
	}

}
