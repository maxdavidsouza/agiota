package br.com.ufape.agiota.model.usuarios;

import java.sql.Date;
import java.util.List;

import br.com.ufape.agiota.model.autenticacao.Endereco;
import br.com.ufape.agiota.model.autenticacao.Login;

public abstract class Usuario {
	private long id;
	private String nome;
	private String telefone;
	private Date dataDeNascimento;
	private float nota;
	private Login login;
	private Endereco endereco;
	private List<Notificacao> notificacoes;
	
	public Usuario(String nome, String telefone, Date dataDeNascimento) {
		this.nome = nome;
		this.telefone = telefone;
		this.dataDeNascimento = dataDeNascimento;
	}
	
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
	
	public Date dataDeNascimento() {
		return dataDeNascimento;
	}
	
	public void dataDeNascimento(Date dataDeNascimento) {
		this.dataDeNascimento = dataDeNascimento;
	}
	
	public float getNota() {
		return nota;
	}

	public void setNota(float nota) {
		this.nota = nota;
	}
}
