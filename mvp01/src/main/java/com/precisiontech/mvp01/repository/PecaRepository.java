package com.precisiontech.mvp01.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.precisiontech.mvp01.model.Peca;

public interface PecaRepository extends CrudRepository<Peca, Long> {

    @Query("SELECT p FROM Peca p WHERE p.nome LIKE :nome%")
    Iterable<Peca> findByNome(String nome);
}
