package com.precisiontech.mvp03.resource;

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

import com.precisiontech.mvp03.entity.Peca;
import com.precisiontech.mvp03.repository.PecaRepository;

@RestController
@RequestMapping("/pecas")
public class PecaResource {

	@Autowired
	private PecaRepository pecaRepository;
	
	//localhost:8080/pecas/create
	@PostMapping("/create")
	public Peca createPeca(@RequestBody Peca peca) {
		return pecaRepository.save(peca);
	}
	
	// localhost:8080/pecas/volumeCilindro
	@PostMapping("/volumeCilindro")
	public Peca volumeCilindro(@RequestBody Map<String, Double> request) {
		double num1 = request.get("num1");
		double num2 = request.get("num2");

		Peca peca = new Peca();
		peca.setNumero1(num1 / 2);
		peca.setNumero2(num2);
		peca.setOperacao("Volume do Cilindro");
		peca.setResultado(Math.PI * Math.pow(num1, 2) * num2);

		return pecaRepository.save(peca);
	}

	// Calculo da area de uma peça prismática com a base quadrada
	//localhost:8080/pecas/AreaBaseQuadrada
	@PostMapping("/AreaBaseQuadrada")
	public Peca areaComBaseQuadrada(@RequestBody Map<String, Double> request) {
		double num1 = request.get("num1");

		Peca peca = new Peca();
		peca.setNumero1(num1);
		peca.setOperacao("Cálculo da Área de uma peça prismática com a base Quadrada");
		peca.setResultado(Math.pow(num1, 2));

		return pecaRepository.save(peca);
	}

	// Calculo da area de uma peça prismática com a base retangular
	//localhost:8080/pecas/AreaBaseRetangular
	@PostMapping("/AreaBaseRetangular")
	public Peca areaComBaseRetangular(@RequestBody Map<String, Double> request) {
		double num1 = request.get("num1");
		double num2 = request.get("num2");

		Peca peca = new Peca();
		peca.setNumero1(num1);
		peca.setNumero2(num2);
		peca.setOperacao("Cálculo da Área de uma peça prismática com a base retangular");
		peca.setResultado(num1 * num2);

		return pecaRepository.save(peca);
	}

	// Calculo da area de uma peça prismática com a base triangular
	//localhost:8080/pecas/baseTriangular
	@PostMapping("/baseTriangular")
	public Peca areaComBaseTriangular(@RequestBody Map<String, Double> request) {
		double num1 = request.get("num1");
		double num2 = request.get("num2");

		Peca peca = new Peca();
		peca.setNumero1(num1);
		peca.setNumero2(num2);
		peca.setOperacao("Cálculo da Área de uma peça prismática com a base triangular");
		peca.setResultado(0.5 * num1 * num2);

		return pecaRepository.save(peca);
	}

	// Calculo da area de uma peça prismática com a base circular
	//localhost:8080/pecas/baseCircular
	@PostMapping("/baseCircular")
	public Peca areaComBaseCircular(@RequestBody Map<String, Double> request) {
		double num1 = request.get("num1");
		double num2 = request.get("num2");

		Peca peca = new Peca();
		peca.setNumero1(num1);
		peca.setNumero2(num2);
		peca.setOperacao("Cálculo da Área de uma peça prismática com a base circular");
		peca.setResultado(Math.PI * Math.pow(num1, 2));

		return pecaRepository.save(peca);
	}
	
	//localhost:8080/pecas/volumePrismatico
	@PostMapping("/volumePrismatico")
	public Peca volumePrismatico(@RequestBody Map<String, Double> request) {
	    double num1 = request.get("num1");
	    double num2 = request.get("num2");

	    Peca peca = new Peca();
	    peca.setNumero1(num1);
	    peca.setNumero2(num2);
	    peca.setOperacao("Cálculo do Volume de uma peça prismática");
	    peca.setResultado(num1 * num2);

	    return pecaRepository.save(peca);
	}

  //localhost:8080/pecas/historico/findById/{id}
	@GetMapping("historico/findById/{id}")
	public Peca procuraPorId(@PathVariable Long id) {
		return pecaRepository.findById(id).orElse(null);
	}

	//localhost:8080/pecas/historico
	@GetMapping("/historico")
	public Iterable<Peca> getHistorico() {
		return pecaRepository.findAll();
	}

	//localhost:8080/pecas/historico/{qtd}
	@GetMapping("/historico/{qtd}")
	public Iterable<Peca> getHistorico(@PathVariable int qtd) {
		return pecaRepository.findOperacoes(PageRequest.of(0, qtd));
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