package com.precisiontech.mvp03.repository;

import com.precisiontech.mvp03.entity.Calculo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CalculoRepository extends CrudRepository<Calculo, Long> {
	
	@Query("SELECT p FROM Peca p")
	Page<Calculo> findOperacoes(Pageable pageable);
	
	
}
