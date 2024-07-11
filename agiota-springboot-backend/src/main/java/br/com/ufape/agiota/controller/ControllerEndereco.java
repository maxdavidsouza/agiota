package br.com.ufape.agiota.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufape.agiota.model.autenticacao.Endereco;
import br.com.ufape.agiota.repository.RepositorioAgiota;
import br.com.ufape.agiota.repository.RepositorioCliente;
import br.com.ufape.agiota.repository.RepositorioEndereco;

@RestController
@RequestMapping("/api/")
public class ControllerEndereco 
{
	@Autowired
	private RepositorioEndereco repositorioEndereco;
	
	@Autowired
	private RepositorioCliente repositorioCliente;
	
	@Autowired
	private RepositorioAgiota repositorioAgiota;
	
	@GetMapping("/clientes/{id}/enderecos")
	public Endereco buscarEnderecoDeCliente(@PathVariable Long id)
	{
		return repositorioCliente.findById(id).get().getEndereco();
	}
	
	@GetMapping("/agiotas/{id}/enderecos")
	public Endereco buscarEnderecoDeAgiota(@PathVariable Long id)
	{
		return repositorioAgiota.findById(id).get().getEndereco();
	}
	
	@GetMapping("/enderecos")
	public List<Endereco> listarEnderecos() 
	{
		return repositorioEndereco.findAll();
	}
}
