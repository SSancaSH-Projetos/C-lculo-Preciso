package com.precisiontech.cp.controller;

import com.precisiontech.cp.entity.MaoDeObra;
import com.precisiontech.cp.entity.Maquina;
import com.precisiontech.cp.entity.Material;
import com.precisiontech.cp.entity.Peca;
import com.precisiontech.cp.repository.MaoDeObraRepository;
import com.precisiontech.cp.repository.MaquinaRepository;
import com.precisiontech.cp.repository.MaterialRepository;
import com.precisiontech.cp.repository.PecaRepository;
import org.antlr.v4.runtime.misc.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pecas")
public class PecaController {

    @Autowired
    private final PecaRepository pecaRepository;
    @Autowired
    private MaterialRepository materialRepository;
    @Autowired
    private MaoDeObraRepository maoDeObraRepository;
    @Autowired
    private MaquinaRepository maquinaRepository;

    @Autowired
    public PecaController(PecaRepository pecaRepository) {
        this.pecaRepository = pecaRepository;
    }

    @GetMapping("/")
    public Iterable<Peca> getAllPecas() {
        return pecaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Peca getPecaById(@PathVariable Long id) {
        return pecaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Peca not found with id: " + id));
    }

//    @PostMapping("/create")
//    public Peca createPeca(@RequestBody Peca peca) {
//        for (MaoDeObra maoDeObra : peca.getMaosDeObra()) {
//            if (maoDeObra.getPeca() == null) {
//                maoDeObra.setPeca(peca);
//            }
//            maoDeObraRepository.save(maoDeObra);
//        }
//
//        if (peca.getMaterial() != null) {
//            if (peca.getMaterial().getPeca() == null) {
//                peca.getMaterial().setPeca(peca);
//            }
//            materialRepository.save(peca.getMaterial());
//        }
//
//        for (Maquina maquina : peca.getMaquinas()) {
//            if (maquina.getPeca() == null) {
//                maquina.setPeca(peca);
//            }
//            maquinaRepository.save(maquina);
//        }
//
//        return pecaRepository.save(peca);
//    }

    @PutMapping("/{id}")
    public Peca updatePeca(@PathVariable Long id, @RequestBody Peca updatedPeca) {
        Peca existingPeca = pecaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Peca not found with id: " + id));

        existingPeca.setCodigo(updatedPeca.getCodigo());
        existingPeca.setNomeDaPeca(updatedPeca.getNomeDaPeca());
        existingPeca.setDataDeCriacao(updatedPeca.getDataDeCriacao());
        existingPeca.setMaosDeObra(updatedPeca.getMaosDeObra());
        existingPeca.setMaterial(updatedPeca.getMaterial());
        existingPeca.setMaquinas(updatedPeca.getMaquinas());

        return pecaRepository.save(existingPeca);
    }

    @DeleteMapping("/{id}")
    public void deletePeca(@PathVariable Long id) {
        pecaRepository.deleteById(id);
    }
}
