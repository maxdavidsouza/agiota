package br.com.ufape.agiota.model.usuarios;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(name="usuario_id")
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
