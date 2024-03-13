package com.precisiontech.mvp03.controller;

import java.util.Map;

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

import com.precisiontech.mvp03.entity.Calculo;
import com.precisiontech.mvp03.repository.CalculoRepository;

@RestController
@RequestMapping("/calculos")
public class CalculoController {

	@Autowired
	private CalculoRepository calculoRepository;

	// localhost:8080/calculos/volumeCilindro
	@PostMapping("/volumeCilindro")
	public Calculo volumeCilindro(@RequestBody Map<String, Double> request) {
		double num1 = request.get("num1");
		double num2 = request.get("num2");

		Calculo calculo = new Calculo();
		calculo.setNumero1(num1);
		calculo.setNumero2(num2);
		calculo.setOperacao("Volume do Cilindro");

		double resultado = Math.PI * Math.pow(num1, 2) * num2;
		calculo.setResultado(arredondarPara3CasasDecimais(resultado));

		return calculoRepository.save(calculo);
	}

	private double arredondarPara3CasasDecimais(double valor) {
		return Math.round(valor * 1000.0) / 1000.0;
	}

	// Calculo da area de uma peça prismática com a base quadrada
	//localhost:8080/calculos/AreaBaseQuadrada
	@PostMapping("/AreaBaseQuadrada")
	public Calculo areaComBaseQuadrada(@RequestBody Map<String, Double> request) {
		double num1 = request.get("num1");

		Calculo calculo = new Calculo();
		calculo.setNumero1(num1);
		calculo.setOperacao("Cálculo da Área de uma peça prismática com a base Quadrada");
		calculo.setResultado(Math.pow(num1, 2));

		return calculoRepository.save(calculo);
	}

	// Calculo da area de uma peça prismática com a base retangular
	//localhost:8080/calculos/AreaBaseRetangular
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

	// Calculo da area de uma peça prismática com a base triangular
	//localhost:8080/calculos/baseTriangular
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

	// Calculo da area de uma peça prismática com a base circular
	//localhost:8080/calculos/baseCircular
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
	
	//localhost:8080/calculos/volumePrismatico
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

  //localhost:8080/calculos/historico/findById/{id}
	@GetMapping("historico/findById/{id}")
	public Calculo procuraPorId(@PathVariable Long id) {
		return calculoRepository.findById(id).orElse(null);
	}

	//localhost:8080/calculos/historico
	@GetMapping("/historico")
	public Iterable<Calculo> getHistorico() {
		return calculoRepository.findAll();
	}

	//localhost:8080/calculos/historico/{qtd}
	@GetMapping("/historico/{qtd}")
	public Iterable<Calculo> getHistorico(@PathVariable int qtd) {
		return calculoRepository.findOperacoes(PageRequest.of(0, qtd));
	}

	//localhost:8080/calculos/{id}
	@DeleteMapping("{id}")
	public void deleteCalculo(@PathVariable Long id) {
		calculoRepository.deleteById(id);
	}

	//localhost:8080/calculos/{id}
	@PutMapping("/{id}")
	public Calculo updateCalculo(@PathVariable Long id, @RequestBody Calculo calculo) {
		calculo.setId(id);
		return calculoRepository.save(calculo);
	}
}