package com.precisiontech.cp.controller;

import com.precisiontech.cp.DTO.MaoDeObraDTO;
import com.precisiontech.cp.DTO.PecaDTO;
import com.precisiontech.cp.entity.MaoDeObra;
import com.precisiontech.cp.entity.Material;
import com.precisiontech.cp.entity.Peca;
import com.precisiontech.cp.repository.MaoDeObraRepository;
import com.precisiontech.cp.repository.MaterialRepository;
import com.precisiontech.cp.repository.PecaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pecas")
public class PecaController {

    private final PecaRepository pecaRepository;

    private final MaterialRepository materialRepository;

    private final MaoDeObraRepository maoDeObraRepository;

    @Autowired
    public PecaController(PecaRepository pecaRepository, MaterialRepository materialRepository, MaoDeObraRepository maoDeObraRepository) {
        this.pecaRepository = pecaRepository;
        this.materialRepository = materialRepository;
        this.maoDeObraRepository = maoDeObraRepository;
    }

    @GetMapping("/pecas")
    public List<PecaDTO> getAllPecas() {
        List<Peca> pecas = (List<Peca>) pecaRepository.findAll();
        return pecas.stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public PecaDTO getPecaById(@PathVariable Long id) {
        Peca peca = pecaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Peca not found with id: " + id));
        return toDTO(peca);
    }

    @PostMapping
    public PecaDTO createPeca(@RequestBody PecaDTO pecaDTO) {
        Peca peca = fromDTO(pecaDTO);
        peca = pecaRepository.save(peca);
        return toDTO(peca);
    }

    @PutMapping("/{id}")
    public PecaDTO updatePeca(@PathVariable Long id, @RequestBody PecaDTO updatedPecaDTO) {
        Peca existingPeca = pecaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Peca not found with id: " + id));
        BeanUtils.copyProperties(fromDTO(updatedPecaDTO), existingPeca, "id");
        existingPeca = pecaRepository.save(existingPeca);
        return toDTO(existingPeca);
    }

    @DeleteMapping("/{id}")
    public void deletePeca(@PathVariable Long id) {
        pecaRepository.deleteById(id);
    }

    private PecaDTO toDTO(Peca peca) {
        List<Long> maosDeObraIds = peca.getMaosDeObra().stream()
                .map(MaoDeObra::getId)
                .collect(Collectors.toList());

        return new PecaDTO(
                peca.getId(),
                peca.getCodigo(),
                peca.getNomeDaPeca(),
                peca.getDataDeCriacao(),
                maosDeObraIds,
                peca.getMaterial().getId() // Passa apenas o ID do material
        );
    }

    private Peca fromDTO(PecaDTO pecaDTO) {
        List<MaoDeObra> maosDeObra = pecaDTO.getMaosDeObraIds().stream()
                .map(maoDeObraId -> maoDeObraRepository.findById(maoDeObraId)
                        .orElseThrow(() -> new RuntimeException("Mão de obra not found with id: " + maoDeObraId)))
                .collect(Collectors.toList());

        Material material = materialRepository.findById(pecaDTO.getMaterialId())
                .orElseThrow(() -> new RuntimeException("Material not found with id: " + pecaDTO.getMaterialId()));

        Peca peca = new Peca();
        peca.setId(pecaDTO.getId());
        peca.setCodigo(pecaDTO.getCodigo());
        peca.setNomeDaPeca(pecaDTO.getNomeDaPeca());
        peca.setDataDeCriacao(pecaDTO.getDataDeCriacao());
        peca.setMaosDeObra(maosDeObra);
        peca.setMaterial(material);

        return peca;
    }
}