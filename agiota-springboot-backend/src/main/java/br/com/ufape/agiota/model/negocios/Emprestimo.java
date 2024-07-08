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
	
	private BigDecimal taxaTotal;
	private String formaDePagamento;
	private String estado;
	
	@ManyToOne
	@JoinColumn(nullable = false)
	private Agiota credor;
	
	@ManyToOne
	@JoinColumn(nullable = false)
	private Cliente devedor;

	@OneToMany(mappedBy = "emprestimo", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Parcela> parcelas;

	public Emprestimo(BigDecimal valorEmprestado, BigDecimal valorASerPago, BigDecimal taxaTotal, String formaDePagamento, String estado, Cliente devedor, Agiota credor) {
		this.valorEmprestado = valorEmprestado;
		this.valorASerPago = valorASerPago;
		this.taxaTotal = taxaTotal;
		this.formaDePagamento = formaDePagamento;
		this.estado = estado;
		this.credor = credor;
		this.devedor = devedor;
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
	}

}
