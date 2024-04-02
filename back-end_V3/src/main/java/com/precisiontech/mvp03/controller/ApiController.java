package com.precisiontech.mvp03.controller;


import com.precisiontech.mvp03.entity.Calculo;
import com.precisiontech.mvp03.entity.Peca;
import com.precisiontech.mvp03.repository.CalculoRepository;
import com.precisiontech.mvp03.repository.PecaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private PecaRepository pecaRepository;

    @Autowired
    private CalculoRepository calculoRepository;

    // Endpoints para operações relacionadas a Peça

    @PostMapping("/pecas")
    public Peca createPeca(@RequestBody Peca peca) {
        return pecaRepository.save(peca);
    }

    @GetMapping("/pecas")
    public Iterable<Peca> getHistoricoPecas() {
        return pecaRepository.findAll();
    }

    @GetMapping("/pecas/{id}")
    public Peca getDetalhesPeca(@PathVariable Long id) {
        return pecaRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/pecas/{id}")
    public void deletePeca(@PathVariable Long id) {
        pecaRepository.deleteById(id);
    }

    @PutMapping("/pecas/{id}")
    public Peca updatePeca(@PathVariable Long id, @RequestBody Peca peca) {
        peca.setId(id);
        return pecaRepository.save(peca);
    }

    // Endpoints para operações relacionadas a Cálculo

    @PostMapping("/pecas/{pecaId}/calculos")
    public Calculo createCalculo(@PathVariable Long pecaId, @RequestBody Calculo calculo) {
        Peca peca = pecaRepository.findById(pecaId).orElse(null);
        if (peca != null) {
            calculo.setPeca(peca);
            return calculoRepository.save(calculo);
        }
        return null; // Ou lançar exceção de recurso não encontrado
    }

    @GetMapping("/pecas/{pecaId}/calculos")
    public Iterable<Calculo> getHistoricoCalculos(@PathVariable Long pecaId) {
        Peca peca = pecaRepository.findById(pecaId).orElse(null);
        return (peca != null) ? peca.getCalculos() : null;
    }

    @DeleteMapping("/calculos/{id}")
    public void deleteCalculo(@PathVariable Long id) {
        calculoRepository.deleteById(id);
    }

    @PutMapping("/calculos/{id}")
    public Calculo updateCalculo(@PathVariable Long id, @RequestBody Calculo calculo) {
        calculo.setId(id);
        return calculoRepository.save(calculo);
    }

    @PostMapping("/calculos/volumeCilindro")
    public Calculo volumeCilindro(@RequestBody Map<String, String> request) {
        if (request.containsKey("pecaId") && request.containsKey("num1") && request.containsKey("num2")) {
            Long pecaId = Long.parseLong(request.get("pecaId"));
            Peca peca = pecaRepository.findById(pecaId).orElse(null);
            if (peca != null) {
                String num1Str = request.get("num1");
                String num2Str = request.get("num2");

                if (num1Str != null && num2Str != null) {
                    double num1 = Double.parseDouble(num1Str);
                    double num2 = Double.parseDouble(num2Str);

                    Calculo calculo = new Calculo();
                    calculo.setPeca(peca);
                    calculo.setNumero1(num1);
                    calculo.setNumero2(num2);
                    calculo.setOperacao("Volume do Cilindro");

                    double resultado = Math.PI * Math.pow(num1, 2) * num2;
                    calculo.setResultado(arredondarPara3CasasDecimais(resultado));

                    return calculoRepository.save(calculo);
                }
            }
        }
        return null; // Ou lançar exceção de recurso não encontrado
    }



    @PostMapping("/pecas/{pecaId}/calculos/AreaBaseQuadrada")
        public Calculo areaComBaseQuadrada(@PathVariable Long pecaId, @RequestBody Map<String, Double> request) {
            Peca peca = pecaRepository.findById(pecaId).orElse(null);
            if (peca != null) {
                double num1 = request.get("num1");

                Calculo calculo = new Calculo();
                calculo.setPeca(peca);
                calculo.setNumero1(num1);
                calculo.setOperacao("Cálculo da Área de uma peça prismática com a base Quadrada");
                calculo.setResultado(Math.pow(num1, 2));

                return calculoRepository.save(calculo);
            }
            return null; // Ou lançar exceção de recurso não encontrado
        }

        @PostMapping("/pecas/{pecaId}/calculos/AreaBaseRetangular")
        public Calculo areaComBaseRetangular(@PathVariable Long pecaId, @RequestBody Map<String, Double> request) {
            Peca peca = pecaRepository.findById(pecaId).orElse(null);
            if (peca != null) {
                double num1 = request.get("num1");
                double num2 = request.get("num2");

                Calculo calculo = new Calculo();
                calculo.setPeca(peca);
                calculo.setNumero1(num1);
                calculo.setNumero2(num2);
                calculo.setOperacao("Cálculo da Área de uma peça prismática com a base retangular");
                calculo.setResultado(num1 * num2);

                return calculoRepository.save(calculo);
            }
            return null; // Ou lançar exceção de recurso não encontrado
        }

        @PostMapping("/pecas/{pecaId}/calculos/baseTriangular")
        public Calculo areaComBaseTriangular(@PathVariable Long pecaId, @RequestBody Map<String, Double> request) {
            Peca peca = pecaRepository.findById(pecaId).orElse(null);
            if (peca != null) {
                double num1 = request.get("num1");
                double num2 = request.get("num2");

                Calculo calculo = new Calculo();
                calculo.setPeca(peca);
                calculo.setNumero1(num1);
                calculo.setNumero2(num2);
                calculo.setOperacao("Cálculo da Área de uma peça prismática com a base triangular");
                calculo.setResultado(0.5 * num1 * num2);

                 return calculoRepository.save(calculo);
            }
            return null; // Ou lançar exceção de recurso não encontrado
        }

        @PostMapping("/pecas/{pecaId}/calculos/baseCircular")
        public Calculo areaComBaseCircular(@PathVariable Long pecaId, @RequestBody Map<String, Double> request) {
            Peca peca = pecaRepository.findById(pecaId).orElse(null);
            if (peca != null) {
                double num1 = request.get("num1");
                double num2 = request.get("num2");

                Calculo calculo = new Calculo();
                calculo.setPeca(peca);
                calculo.setNumero1(num1);
                calculo.setNumero2(num2);
                calculo.setOperacao("Cálculo da Área de uma peça prismática com a base circular");
                calculo.setResultado(Math.PI * Math.pow(num1, 2));

                return calculoRepository.save(calculo);
            }
            return null; // Ou lançar exceção de recurso não encontrado
        }

        @PostMapping("/pecas/{pecaId}/calculos/volumePrismatico")
        public Calculo volumePrismatico(@PathVariable Long pecaId, @RequestBody Map<String, Double> request) {
            Peca peca = pecaRepository.findById(pecaId).orElse(null);
            if (peca != null) {
                double num1 = request.get("num1");
                double num2 = request.get("num2");

                Calculo calculo = new Calculo();
                calculo.setPeca(peca);
                calculo.setNumero1(num1);
                calculo.setNumero2(num2);
                calculo.setOperacao("Cálculo do Volume de uma peça prismática");
                calculo.setResultado(num1 * num2);

                return calculoRepository.save(calculo);
            }
            return null; // Ou lançar exceção de recurso não encontrado
        }

    @GetMapping("/pecas/ultima")
    public Peca getUltimaPecaCadastrada() {
        return pecaRepository.findFirstByOrderByIdDesc();
    }
    private double arredondarPara3CasasDecimais(double valor) {
        return Math.round(valor * 1000.0) / 1000.0;
    }
    }
