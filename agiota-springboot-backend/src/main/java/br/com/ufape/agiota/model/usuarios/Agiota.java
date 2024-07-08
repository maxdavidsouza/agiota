package br.com.ufape.agiota.model.usuarios;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import br.com.ufape.agiota.model.negocios.Emprestimo;

@Entity
@DiscriminatorValue(value = "A")
public class Agiota extends Usuario {
	
	@OneToMany(mappedBy = "credor", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Emprestimo> emprestimos;
	
	public Agiota(String nome, String telefone, Date dataDeNascimento) {
		super(nome, telefone, dataDeNascimento);
	}

	public void avaliarCliente() {

	}

	public void publicarEmprestimo() {

	}

	public void fecharEmprestimo() {

	}

	public void editarEmprestimo() {

	}

	public void removerEmprestimo() {

	}

	public void notificarCliente() {

	}
}
