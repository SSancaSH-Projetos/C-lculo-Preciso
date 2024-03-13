package com.precisiontech.mvp03.repository;

import com.precisiontech.mvp03.entity.Calculo;
import com.precisiontech.mvp03.entity.Peca;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface PecaRepository extends CrudRepository<Peca, Long> {

    @Query("SELECT p FROM Peca p WHERE p.nomePeca LIKE :nome%")
    Iterable<Peca> findByNome(String nome);
}
