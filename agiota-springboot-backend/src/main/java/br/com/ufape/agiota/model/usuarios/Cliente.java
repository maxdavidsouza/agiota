package br.com.ufape.agiota.model.usuarios;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

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
			throw new DadoNaoEncontradoException("Emprestimos não encontrados.");
		this.emprestimos = emprestimos;
	}

	public void avaliarAgiota(Agiota a, float novaNota) {
		a.setNota(a.getNota()+novaNota);
	}

	public void aceitarEmprestimo(Emprestimo e) {
		if(e.equals(null))
			throw new DadoNaoEncontradoException("Emprestimo não encontrado.");
		e.setEstado("Em acordo");
		new Notificacao(this.getNome()+" deseja aceitar seu empréstimo.", this, e.getCredor(), LocalDateTime.now());
	}

	public void pagarEmprestimo(BigDecimal valor, Parcela parcela) {
		Pagamento p = new Pagamento(valor, parcela, this);
		pagamentos.add(p);
	}

	public Notificacao gerarLembrete(Parcela p, LocalDateTime dataDoLembrete) {
		Notificacao lembrete = new Notificacao();
		lembrete.setTexto("Lembre-se de pagar a parcela de "+p.getValorASerPago()
		+" antes do dia "+p.getDataDeVencimento().toString());
		lembrete.setDestinatario(this);
		lembrete.setRemetente(this);
		lembrete.setDataEHoraDeEnvio(dataDoLembrete);
		return lembrete;
	}
	
}
