package br.com.ufape.agiota.model;

import java.sql.Date;

public abstract class Usuario {
	private long id;
	private String nome;
	private String telefone;
	private Date dataDeNascimentoDate;
	private float nota;
	private Login login;
	private Endereco endereco;
	
	
	public String getNome() {
		return nome;
	}
	
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public String getTelefone() {
		return telefone;
	}
	
	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	
	public Date getDataDeNascimentoDate() {
		return dataDeNascimentoDate;
	}
	
	public void setDataDeNascimentoDate(Date dataDeNascimentoDate) {
		this.dataDeNascimentoDate = dataDeNascimentoDate;
	}
	
	public float getNota() {
		return nota;
	}

	public void setNota(float nota) {
		this.nota = nota;
	}
}
