package br.com.ufape.agiota.model.usuarios;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.ufape.agiota.exceptions.DadoNaoEncontradoException;
import br.com.ufape.agiota.model.autenticacao.Endereco;
import br.com.ufape.agiota.model.autenticacao.Login;
import br.com.ufape.agiota.model.negocios.Emprestimo;
import br.com.ufape.agiota.model.negocios.Pagamento;
import br.com.ufape.agiota.model.negocios.Parcela;

@Entity
@DiscriminatorValue(value = "C")
public class Cliente extends Usuario {
	
	@JsonIgnore
	@OneToMany(mappedBy = "devedor", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Emprestimo> emprestimos;
	
	@JsonIgnore
	@OneToMany(mappedBy = "pagador", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Pagamento> pagamentos;
	
	public Cliente(){}

	public Cliente(String nome, String telefone, LocalDate dataDeNascimento, Login login, Endereco endereco) {
		super(nome, telefone, dataDeNascimento, login, endereco);
	}
	
	public List<Emprestimo> getEmprestimos() {
		return emprestimos;
	}

	public void setEmprestimos(List<Emprestimo> emprestimos) {
		if(emprestimos.equals(null))
			throw new DadoNaoEncontradoException("Empréstimos não encontrados.");
		this.emprestimos = emprestimos;
	}

	public void recomendarAgiota(Agiota a, float novaNota) {
		a.setNota(a.getNota()+novaNota);
	}

	public void aceitarEmprestimo(Emprestimo e) {
		if(e.equals(null))
			throw new DadoNaoEncontradoException("Empréstimo não encontrado.");
		e.setEstado("Em acordo");
		e.setDevedor(this);
		enviarNotificacao(this.getNome() + " deseja aceitar o seu empréstimo " + e.getCredor().getNome(), e.getCredor());
	}

	public void pagarParcela(BigDecimal valor, Parcela parcela) {
		Pagamento p = new Pagamento(valor, parcela, this);
		pagamentos.add(p);
	}
	
}
