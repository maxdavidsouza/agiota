package br.com.ufape.agiota.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.ufape.agiota.model.negocios.Pagamento;

@Repository
public interface RepositorioPagamento extends JpaRepository<Pagamento, Long> {
	List<Pagamento> findByPagadorId(Long pagadorId);
	List<Pagamento> findByParcelaId(Long parcelaId);
	List<Pagamento> findByPagadorIdAndParcelaId(Long pagadorId, Long parcelaId);
	Pagamento findByPagadorIdAndParcelaIdAndId(Long pagadorId, Long parcelaId, Long id);
}
