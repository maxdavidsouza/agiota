package br.com.ufape.agiota.model.usuarios;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import br.com.ufape.agiota.model.autenticacao.Endereco;
import br.com.ufape.agiota.model.autenticacao.Login;
import br.com.ufape.agiota.model.negocios.Emprestimo;

@Entity
@DiscriminatorValue(value = "A")
public class Agiota extends Usuario {
	
	@OneToMany(mappedBy = "credor", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Emprestimo> emprestimos;
	
	public Agiota(){}
	
	public Agiota(String nome, String telefone, Date dataDeNascimento, Login login, Endereco endereco) {
		super(nome, telefone, dataDeNascimento, login, endereco);
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
			+"acaba de ser aprovado para"+c, this, c);
			e.setEstado("Fechado");
		}
	}

	public void editarEmprestimo() {

	}

	public void removerEmprestimo(Emprestimo e) {
		emprestimos.remove(e);
	}

	public void notificarCliente(Notificacao n, String texto) {
		n.setTexto(texto);
	}
}
