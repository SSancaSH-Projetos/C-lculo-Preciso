package com.precisiontech.cp.controller;

import com.precisiontech.cp.DTO.PecaDTORequest;
import com.precisiontech.cp.DTO.PecaDTOResponse;
import com.precisiontech.cp.entity.*;
import com.precisiontech.cp.repository.*;
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

    private final MaquinaRepository maquinaRepository;

    private final SubPecaRepository subPecaRepository;

    private final FormatoRepository formatoRepository;

    @Autowired
    public PecaController(PecaRepository pecaRepository, MaterialRepository materialRepository, MaoDeObraRepository maoDeObraRepository, MaquinaRepository maquinaRepository, SubPecaRepository subPecaRepository, FormatoRepository formatoRepository) {
        this.pecaRepository = pecaRepository;
        this.materialRepository = materialRepository;
        this.maoDeObraRepository = maoDeObraRepository;
        this.maquinaRepository = maquinaRepository;
        this.subPecaRepository = subPecaRepository;
        this.formatoRepository = formatoRepository;
    }

    @GetMapping
    public List<PecaDTOResponse> getAllPecas() {
        List<Peca> pecas = (List<Peca>) pecaRepository.findAll();
        return pecas.stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public PecaDTOResponse getPecaById(@PathVariable Long id) {
        Peca peca = pecaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Peca not found with id: " + id));
        return toDTO(peca);
    }

    @PostMapping
    public PecaDTOResponse createPeca(@RequestBody PecaDTORequest pecaDTORequest) {
        Peca peca = fromDTO(pecaDTORequest);

        Peca finalPeca = pecaRepository.save(peca);


        peca.getSubPecas().forEach(subPeca -> {
            if (subPeca.getFormato() != null) {
                subPeca.setPeca(finalPeca);
                formatoRepository.save(subPeca.getFormato());
            }
        });

        peca.getSubPecas().forEach(subPecaRepository::save);


        return toDTO(peca);
    }

    @PutMapping("/{id}")
    public PecaDTOResponse updatePeca(@PathVariable Long id, @RequestBody PecaDTORequest updatedPecaDTORequest) {
        Peca existingPeca = pecaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Peca not found with id: " + id));
        BeanUtils.copyProperties(fromDTO(updatedPecaDTORequest), existingPeca, "id");
        existingPeca = pecaRepository.save(existingPeca);
        return toDTO(existingPeca);
    }

    @DeleteMapping("/{id}")
    public void deletePeca(@PathVariable Long id) {
        pecaRepository.deleteById(id);
    }

    private PecaDTOResponse toDTO(Peca peca) {

        return new PecaDTOResponse(
                peca.getId(),
                peca.getCodigo(),
                peca.getNomeDaPeca(),
                peca.getDataDeCriacao(),
                peca.getMaosDeObra(),
                peca.getMaquinas(),
                peca.getMaterial(),
                peca.getSubPecas()
        );
    }

    private Peca fromDTO(PecaDTORequest pecaDTORequest) {
        List<MaoDeObra> maosDeObra = pecaDTORequest.getMaosDeObraIds().stream()
                .map(maoDeObraId -> maoDeObraRepository.findById(maoDeObraId)
                        .orElseThrow(() -> new RuntimeException("Mão de obra not found with id: " + maoDeObraId)))
                .collect(Collectors.toList());

        List<Maquina> maquinas = pecaDTORequest.getMaquinas().stream()
                .map(maquinasIds -> maquinaRepository.findById(maquinasIds)
                        .orElseThrow(() -> new RuntimeException("Máquina not found with id: " + maquinasIds)))
                .collect(Collectors.toList());

        Material material = materialRepository.findById(pecaDTORequest.getMaterialId())
                .orElseThrow(() -> new RuntimeException("Material not found with id: " + pecaDTORequest.getMaterialId()));

        List<SubPeca> subPecas = pecaDTORequest.getSubPecas().stream()
                .map(subPecaDTO -> {
                    return subPecaDTO.convertToSubPeca(subPecaDTO);
                })
                .collect(Collectors.toList());


        Peca peca = new Peca();
        peca.setId(pecaDTORequest.getId());
        peca.setCodigo(pecaDTORequest.getCodigo());
        peca.setNomeDaPeca(pecaDTORequest.getNomeDaPeca());
        peca.setDataDeCriacao(pecaDTORequest.getDataDeCriacao());
        peca.setMaosDeObra(maosDeObra);
        peca.setMaquinas(maquinas);
        peca.setSubPecas(subPecas);
        peca.setMaterial(material);

        return peca;
    }
}