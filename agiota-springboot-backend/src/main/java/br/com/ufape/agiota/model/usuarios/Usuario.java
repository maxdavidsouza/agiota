package br.com.ufape.agiota.model.usuarios;

import java.time.LocalDate;
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

import com.fasterxml.jackson.annotation.JsonIgnore;
import br.com.ufape.agiota.exceptions.CampoValidator;
import br.com.ufape.agiota.exceptions.CepValidator;
import br.com.ufape.agiota.exceptions.DataDeNascimentoValidator;
import br.com.ufape.agiota.exceptions.EmailValidator;
import br.com.ufape.agiota.exceptions.SenhaValidator;
import br.com.ufape.agiota.model.autenticacao.Endereco;
import br.com.ufape.agiota.model.autenticacao.Login;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo", length = 1, discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("U")
public abstract class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nome;

	private String telefone;
	
	private LocalDate dataDeNascimento;
	
	private float nota;

	@Column(insertable = false, updatable = false)
	private String tipo;

	@OneToOne(cascade = CascadeType.ALL)
	private Login login;

	@OneToOne(cascade = CascadeType.ALL)
	private Endereco endereco;

	@JsonIgnore
	@OneToMany(mappedBy = "destinatario", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Notificacao> notificacoesEnviadas;

	@JsonIgnore
	@OneToMany(mappedBy = "remetente", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Notificacao> notificacoesRecebidas;

	public Usuario() {
	}

	public Usuario(String nome, String telefone, LocalDate dataDeNascimento, Login login, Endereco endereco) {
		CampoValidator.validar(nome, "nome");
		CampoValidator.validar(telefone, "telefone");
		DataDeNascimentoValidator.validar(dataDeNascimento);
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
		CampoValidator.validar(nome, "nome");
		this.nome = nome;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		CampoValidator.validar(telefone, "telefone");
		this.telefone = telefone;
	}

	public LocalDate getDataDeNascimento() {
		return dataDeNascimento;
	}

	public void setDataDeNascimento(LocalDate dataDeNascimento) {
		DataDeNascimentoValidator.validar(dataDeNascimento);
		this.dataDeNascimento = dataDeNascimento;
	}

	public float getNota() {
		return nota;
	}

	public void setNota(float nota) {
		CampoValidator.validar(String.valueOf(nota), "nota");
		this.nota = nota;
	}

	public Login getLogin() {
		return login;
	}

	public void setLogin(Login login) {
		EmailValidator.validar(login.getEmail());
		SenhaValidator.validar(login.getSenha());
		this.login = login;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		CepValidator.validar(endereco.getCep());
		this.endereco = endereco;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public List<Notificacao> getNotificacoesEnviadas() {
		return notificacoesEnviadas;
	}

	public void setNotificacoesEnviadas(List<Notificacao> notificacoesEnviadas) {
		this.notificacoesEnviadas = notificacoesEnviadas;
	}

	public List<Notificacao> getNotificacoesRecebidas() {
		return notificacoesRecebidas;
	}

	public void setNotificacoesRecebidas(List<Notificacao> notificacoesRecebidas) {
		this.notificacoesRecebidas = notificacoesRecebidas;
	}
	
}
