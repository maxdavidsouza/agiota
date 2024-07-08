package br.com.ufape.agiota.model.usuarios;

import java.sql.Date;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue(value = "C")
public class Cliente extends Usuario {

	public Cliente(String nome, String telefone, Date dataDeNascimento) {
		super(nome, telefone, dataDeNascimento);
	}

	public void avaliarAgiota() {

	}

	public void aceitarEmprestimo() {

	}

	public void pagarEmprestimo() {

	}

	public void gerarLembrete() {

	}
}
