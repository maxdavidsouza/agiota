package br.com.ufape.agiota.model.usuarios;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

	public void fecharEmprestimo(Emprestimo e, Cliente c) {
		if(e.getEstado() == "Em acordo") {
			new Notificacao("O empréstimo de "+this.getNome()
			+"acaba de ser aprovado para"+c, this, c, LocalDateTime.now());
			e.setEstado("Fechado");
		}
	}

	public void removerEmprestimo(Emprestimo e) {
		emprestimos.remove(e);
	}
	
}
