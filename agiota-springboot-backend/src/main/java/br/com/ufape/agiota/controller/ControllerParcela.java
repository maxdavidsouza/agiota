package br.com.ufape.agiota.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufape.agiota.model.negocios.Parcela;
import br.com.ufape.agiota.repository.RepositorioParcela;

@RestController
@RequestMapping("/api")
public class ControllerParcela {

	@Autowired
	private RepositorioParcela repositorioParcela;

	@GetMapping("/emprestimos/{id}/parcelas")
	public List<Parcela> listarTodosParcelasDeUmEmprestimo(@PathVariable Long id) {
		return repositorioParcela.findAllByEmprestimoId(id);
	}

	@GetMapping("/emprestimos/{id}/parcelas/buscar-por-estado/{estado}")
	public List<Parcela> listarTodosParcelasDeUmEmprestimoPorEstado(@PathVariable Long id,
			@PathVariable String estado) {
		List<Parcela> parcelas = repositorioParcela.findAllByEmprestimoId(id);
		List<Parcela> parcelasEstado = new ArrayList<>();
		switch (estado) {
			case "vencida": {
				estado = "Vencida";
				break;
			}
			case "aberta": {
				estado = "Aberta";
				break;
			}
			case "parcialmente_paga": {
				estado = "Parcialmente Paga";
				break;
			}
			case "totalmente_paga": {
				estado = "Totalmente Paga";
				break;
			}
		}
		for (Parcela parcela : parcelas) {
			if (parcela.getEstado().equals(estado)) {
				parcelasEstado.add(parcela);
			}
		}
		return parcelasEstado;
	}

}
