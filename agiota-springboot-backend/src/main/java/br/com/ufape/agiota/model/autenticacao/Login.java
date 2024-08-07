package br.com.ufape.agiota.model.autenticacao;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import br.com.ufape.agiota.exceptions.EmailInvalidoException;
import br.com.ufape.agiota.exceptions.EmailValidator;
import br.com.ufape.agiota.exceptions.SenhaInvalidaException;
import br.com.ufape.agiota.exceptions.SenhaValidator;

@Entity
public class Login {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String email;
	private String senha;

	public Login() {
	}

	public Login(String email, String senha) throws EmailInvalidoException,SenhaInvalidaException {
		EmailValidator.validar(email);
		SenhaValidator.validar(senha);
		this.email = email;
		this.senha = senha;
	}
	
	public long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		EmailValidator.validar(email);
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		SenhaValidator.validar(senha);
		this.senha = senha;
	}

}
