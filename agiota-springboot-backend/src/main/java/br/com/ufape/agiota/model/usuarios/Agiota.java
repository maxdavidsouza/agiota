package br.com.ufape.agiota.model.usuarios;

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

@Entity
@DiscriminatorValue(value = "A")
public class Agiota extends Usuario {
	
	@JsonIgnore
	@OneToMany(mappedBy = "credor", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Emprestimo> emprestimos;
	
	public Agiota(){}
	
	public Agiota(String nome, String telefone, LocalDate dataDeNascimento, Login login, Endereco endereco) {
		super(nome, telefone, dataDeNascimento, login, endereco);
	}

	public List<Emprestimo> getEmprestimos() {
		return emprestimos;
	}

	public void setEmprestimos(List<Emprestimo> emprestimos) {
		this.emprestimos = emprestimos;
	}

	public void avaliarCliente(Cliente c, float novaNota) {
		c.setNota(getNota()+novaNota);
	}

	public void publicarEmprestimo(Emprestimo e) {
		if(e.getEstado() == "Aberto") {
			emprestimos.add(e);
		}
	}

	public void fecharEmprestimo(Emprestimo e) {
		if(e.equals(null))
			throw new DadoNaoEncontradoException("Empréstimo não encontrado.");
		
		if(e.getEstado() == "Em acordo") {
			enviarNotificacao(getNome()+" acaba de aprovar o empréstimo de" + e.getValorEmprestado() + "para você" + e.getDevedor().getNome(), e.getDevedor());
			e.setEstado("Fechado");
		}
	}

	public void removerEmprestimo(Emprestimo e) {
		emprestimos.remove(e);
	}
	
}
