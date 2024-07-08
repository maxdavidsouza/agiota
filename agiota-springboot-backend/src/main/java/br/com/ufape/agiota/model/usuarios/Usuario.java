package br.com.ufape.agiota.model.usuarios;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import br.com.ufape.agiota.model.autenticacao.Endereco;
import br.com.ufape.agiota.model.autenticacao.Login;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo", length = 1, discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("U")
public abstract class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String nome;
	private String telefone;
	private Date dataDeNascimento;
	private float nota;
	
	@Column(insertable=false, updatable=false)
	private String tipo;

	@OneToOne(cascade = CascadeType.ALL)
	private Login login;

	@OneToOne(cascade = CascadeType.ALL)
	private Endereco endereco;

	@OneToMany(mappedBy = "destinatario", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Notificacao> notificacoesEnviadas;
	
	@OneToMany(mappedBy = "remetente", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Notificacao> notificacoesRecebidas;
	
	public Usuario(){}

	public Usuario(String nome, String telefone, Date dataDeNascimento, Login login, Endereco endereco) {
		this.nome = nome;
		this.telefone = telefone;
		this.dataDeNascimento = dataDeNascimento;
		this.login = login;
		this.endereco = endereco;
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

	public Date getDataDeNascimento() {
		return dataDeNascimento;
	}

	public void setDataDeNascimento(Date dataDeNascimento) {
		this.dataDeNascimento = dataDeNascimento;
	}

	public float getNota() {
		return nota;
	}

	public void setNota(float nota) {
		this.nota = nota;
	}

	public Login getLogin() {
		return login;
	}

	public void setLogin(Login login) {
		this.login = login;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}
}
