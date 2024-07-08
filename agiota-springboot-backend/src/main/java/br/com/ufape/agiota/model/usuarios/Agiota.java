package br.com.ufape.agiota.model.usuarios;

import java.sql.Date;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue(value = "A")
public class Agiota extends Usuario {
	
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
