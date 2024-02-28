package com.precisiontech.mvp03.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.precisiontech.mvp03.entity.Peca;

public interface PecaRepository extends CrudRepository<Peca, Long> {
	
	@Query("SELECT p FROM Peca p")
	Page<Peca> findOperacoes(Pageable pageable);
	
}
