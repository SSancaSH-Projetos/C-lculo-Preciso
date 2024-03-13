package com.precisiontech.mvp03.controller;


import com.precisiontech.mvp03.entity.Calculo;
import com.precisiontech.mvp03.entity.Peca;
import com.precisiontech.mvp03.repository.PecaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pecas")
public class PecaController {

    @Autowired
    private PecaRepository pecaRepository;

    //localhost:8080/pecas/create
    @PostMapping("/create")
    public Peca createPeca(@RequestBody Peca peca) {
        return pecaRepository.save(peca);
    }

    //localhost:8080/pecas/historico
    @GetMapping("/historico")
    public Iterable<Peca> getHistorico() {
        return pecaRepository.findAll();
    }

    //localhost:8080/pecas/nome/{nome}
    @GetMapping("/nome/{nome}")
    public Iterable<Peca> findByNome(@PathVariable String nomePeca){
        return pecaRepository.findByNome(nomePeca);
    }

    //localhost:8080/pecas/{id}
    @GetMapping("/{id}")
    public Peca findById(@PathVariable Long id) {
        return pecaRepository.findById(id).orElse(null);
    }

    //localhost:8080/pecas/{id}
    @DeleteMapping("{id}")
    public void deletePeca(@PathVariable Long id) {
        pecaRepository.deleteById(id);
    }

    //localhost:8080/pecas/{id}
    @PutMapping("/{id}")
    public Peca updatePeca(@PathVariable Long id, @RequestBody Peca peca) {
        peca.setId(id);
        return pecaRepository.save(peca);
    }
}
