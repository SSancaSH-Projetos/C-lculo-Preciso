package com.precisiontech.mvp01.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.precisiontech.mvp01.model.Peca;
import com.precisiontech.mvp01.repository.PecaRepository;

@RestController
@RequestMapping("/pecas")
public class PecaController {

    @Autowired
    private PecaRepository pecaRepository;

    @GetMapping
    public Iterable<Peca> findAll() {
        return pecaRepository.findAll();
    }

    @GetMapping("/nome/{nome}")
    public Iterable<Peca> findByNome(@PathVariable String nome) {
        return pecaRepository.findByNome(nome);
    }

    @GetMapping("/{id}")
    public Peca findById(@PathVariable Long id) {
        return pecaRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Peca createPeca(@RequestBody Peca peca) {
        return pecaRepository.save(peca);
    }

    @PutMapping("/{id}")
    public Peca updatePeca(@PathVariable Long id, @RequestBody Peca peca) {
        peca.setId(id);
        return pecaRepository.save(peca);
    }

    @DeleteMapping("/{id}")
    public void deletePeca(@PathVariable Long id) {
        pecaRepository.deleteById(id);
    }
}
