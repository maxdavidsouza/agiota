package br.com.ufape.agiota.model.negocios;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.ufape.agiota.exceptions.CampoValidator;
import br.com.ufape.agiota.exceptions.PagamentoInvalidoException;
import br.com.ufape.agiota.model.usuarios.Cliente;

@Entity
public class Pagamento {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "pagador_id")
	private Cliente pagador;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "parcela_id")
	private Parcela parcela;
	
	private BigDecimal valorDoPagamento;
	
	public Pagamento() {}
	
	public Pagamento(BigDecimal valorDoPagamento, Parcela parcela, Cliente pagador) {
		CampoValidator.validar(valorDoPagamento.toString(), "big_decimal");
		this.valorDoPagamento = valorDoPagamento;
		this.parcela = parcela;
		this.pagador = pagador;
		pagarParcela(parcela);
	}

	public long getId() {
		return id;
	}

	public Cliente getPagador() {
		return pagador;
	}

	public void setPagador(Cliente pagador) {
		CampoValidator.validar(valorDoPagamento.toString(), "big_decimal");
		this.pagador = pagador;
	}

	public BigDecimal getValorDoPagamento() {
		return valorDoPagamento;
	}

	public void setValorDoPagamento(BigDecimal valorDoPagamento) {
		this.valorDoPagamento = valorDoPagamento;
	}

	public Parcela getParcela() {
		return parcela;
	}

	public void setParcela(Parcela parcela) {
		this.parcela = parcela;
	}
	
	public void pagarParcela(Parcela parcela) {
		
		if(!(parcela.getDataDePagamento() == null))
			throw new PagamentoInvalidoException("Esta parcela já está paga.");
		
		Multa multa = parcela.getMulta();
		BigDecimal valorAPagar = BigDecimal.ZERO;
		
		if(multa != null)
			valorAPagar = multa.getValor().add(parcela.getValorASerPago());
		else
			valorAPagar = parcela.getValorASerPago();
		
		if(valorAPagar.compareTo(valorDoPagamento) <= 0) {
			parcela.setDataDePagamento(LocalDateTime.now());
			parcela.setValorPago(valorDoPagamento);
		} else {
			throw new PagamentoInvalidoException("Faça o pagamento completo do valor da dívida!");
		}
	}
	
}
