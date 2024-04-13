package com.precisiontech.cp.controller;

import java.util.Map;

import com.precisiontech.cp.entity.Peca;
import com.precisiontech.cp.repository.PecaRepository;
import com.precisiontech.cp.util.CPUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.precisiontech.cp.entity.Calculo;
import com.precisiontech.cp.repository.CalculoRepository;

@RestController
@RequestMapping("/calculos")
public class CalculoController {

	@Autowired
	private CalculoRepository calculoRepository;

	@Autowired
	private PecaRepository pecaRepository;

	@GetMapping("/pecas/ultima")
	public Peca getUltimaPecaCadastrada() {
		return pecaRepository.findFirstByOrderByIdDesc();

	}
	@GetMapping("historico/findById/{id}")
	public Calculo procuraPorId(@PathVariable Long id) {
		return calculoRepository.findById(id).orElse(null);
	}

	@GetMapping("/historico")
	public Iterable<Calculo> getHistorico() {
		return calculoRepository.findAll();
	}

	@GetMapping("/historico/{qtd}")
	public Iterable<Calculo> getHistorico(@PathVariable int qtd) {
		return calculoRepository.findOperacoes(PageRequest.of(0, qtd));
	}

	@GetMapping("/pecas")
	public Iterable<Peca> getHistoricoPecas() {
		return pecaRepository.findAll();
	}

	@GetMapping("/pecas/{id}")
	public Peca getDetalhesPeca(@PathVariable Long id) {
		return pecaRepository.findById(id).orElse(null);
	}

	@GetMapping("/pecas/{pecaId}/calculos")
	public Iterable<Calculo> getHistoricoCalculos(@PathVariable Long pecaId) {
		Peca peca = pecaRepository.findById(pecaId).orElse(null);
		return (peca != null) ? peca.getCalculos() : null;
	}

	@PostMapping("/AreaBaseQuadrada")
	public Calculo areaComBaseQuadrada(@RequestBody Map<String, Double> request) {
		double num1 = request.get("num1");

		Calculo calculo = new Calculo();
		calculo.setNumero1(num1);
		calculo.setOperacao("Cálculo da Área de uma peça prismática com a base Quadrada");
		calculo.setResultado(Math.pow(num1, 2));

		return calculoRepository.save(calculo);
	}

	@PostMapping("/AreaBaseRetangular")
	public Calculo areaComBaseRetangular(@RequestBody Map<String, Double> request) {
		double num1 = request.get("num1");
		double num2 = request.get("num2");

		Calculo calculo = new Calculo();
		calculo.setNumero1(num1);
		calculo.setNumero2(num2);
		calculo.setOperacao("Cálculo da Área de uma peça prismática com a base retangular");
		calculo.setResultado(num1 * num2);

		return calculoRepository.save(calculo);
	}

	@PostMapping("/baseTriangular")
	public Calculo areaComBaseTriangular(@RequestBody Map<String, Double> request) {
		double num1 = request.get("num1");
		double num2 = request.get("num2");

		Calculo calculo = new Calculo();
		calculo.setNumero1(num1);
		calculo.setNumero2(num2);
		calculo.setOperacao("Cálculo da Área de uma peça prismática com a base triangular");
		calculo.setResultado(0.5 * num1 * num2);

		return calculoRepository.save(calculo);
	}

	@PostMapping("/baseCircular")
	public Calculo areaComBaseCircular(@RequestBody Map<String, Double> request) {
		double num1 = request.get("num1");
		double num2 = request.get("num2");

		Calculo calculo = new Calculo();
		calculo.setNumero1(num1);
		calculo.setNumero2(num2);
		calculo.setOperacao("Cálculo da Área de uma peça prismática com a base circular");
		calculo.setResultado(Math.PI * Math.pow(num1, 2));

		return calculoRepository.save(calculo);
	}

	@PostMapping("/volumePrismatico")
	public Calculo volumePrismatico(@RequestBody Map<String, Double> request) {
	    double num1 = request.get("num1");
	    double num2 = request.get("num2");

		Calculo calculo = new Calculo();
		calculo.setNumero1(num1);
		calculo.setNumero2(num2);
		calculo.setOperacao("Cálculo do Volume de uma peça prismática");
		calculo.setResultado(num1 * num2);

	    return calculoRepository.save(calculo);
	}

	@PostMapping("/pecas/{pecaId}/calculos")
	public Calculo createCalculo(@PathVariable Long pecaId, @RequestBody Calculo calculo) {
		Peca peca = pecaRepository.findById(pecaId).orElse(null);
		if (peca != null) {
			calculo.setPeca(peca);
			return calculoRepository.save(calculo);
		}
		return null; // Ou lançar exceção de recurso não encontrado
	}

	@PostMapping("/volumeCilindro")
	public Calculo volumeCilindro(@RequestBody Map<String, Double> request) {
		double num1 = request.get("num1");
		double num2 = request.get("num2");

		Calculo calculo = new Calculo();
		calculo.setNumero1(num1);
		calculo.setNumero2(num2);
		calculo.setOperacao("Volume do Cilindro");

		double resultado = Math.PI * Math.pow(num1, 2) * num2;
		calculo.setResultado(CPUtil.arredondarPara3CasasDecimais(resultado));

		return calculoRepository.save(calculo);
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


	@PutMapping("/{id}")
	public Calculo updateCalculo(@PathVariable Long id, @RequestBody Calculo calculo) {
		calculo.setId(id);
		return calculoRepository.save(calculo);
	}

	@PostMapping("/pecas")
	public Peca createPeca(@RequestBody Peca peca) {
		return pecaRepository.save(peca);
	}


	@DeleteMapping("/pecas/{id}")
	public void deletePeca(@PathVariable Long id) {
		pecaRepository.deleteById(id);
	}

	@DeleteMapping("{id}")
	public void deleteCalculo(@PathVariable Long id) {
		calculoRepository.deleteById(id);
	}

	@PutMapping("/pecas/{id}")
	public Peca updatePeca(@PathVariable Long id, @RequestBody Peca peca) {
		peca.setId(id);
		return pecaRepository.save(peca);
	}



}