package com.precisiontech.mvp03.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.precisiontech.mvp03.entity.Peca;
import com.precisiontech.mvp03.repository.PecaRepository;



@RestController
@RequestMapping("/pecas")
public class PecaResource{
	
	@Autowired
	private PecaRepository pecaRepository;

	//Calculo do volume do cilindro
	@GetMapping("/volumeCilindro/{num1}/{num2}")
	public Peca volumeCilindro(@PathVariable double num1, @PathVariable double num2) {
	    Peca peca = new Peca();
	    peca.setNumero1(num1 / 2);
	    peca.setNumero2(num2);
	    peca.setOperacao("Volume do Cilindro");
	    peca.setResultado(Math.PI * Math.pow(num1, 2) * num2);
	    return pecaRepository.save(peca);
	}
	
	//Calculo da area de uma peça prismática com a base quadrada
	@GetMapping("/AreaBaseQuadrada/{num1}")
	public Peca areaComBaseQuadrada(@PathVariable double num1) {
	    Peca peca = new Peca();
	    peca.setNumero1(num1);
	    peca.setOperacao("Cálculo da Área de uma peça prismática com a base Quadrada");
	    peca.setResultado(Math.pow(num1, 2));
	    return pecaRepository.save(peca);
	}
	
	//Calculo da area de uma peça prismática com a base retangular
	@GetMapping("/AreaBaseRetangular/{num1}/{num2}")
	public Peca areaComBaseRetangular(@PathVariable double num1, @PathVariable double num2) {
	    Peca peca = new Peca();
	    peca.setNumero1(num1);
	    peca.setNumero2(num2);
	    peca.setOperacao("Cálculo da Área de uma peça prismática com a base retangular");
	    peca.setResultado(num1 * num2);
	    return pecaRepository.save(peca);
	}
	
	//Calculo da area de uma peça prismática com a base triangular
	@GetMapping("baseTriangular/{num1}/{num2}")
	public Peca areaComBaseTriangular (@PathVariable double num1, @PathVariable double num2) {
	    Peca peca = new Peca();
	    peca.setNumero1(num1);
	    peca.setNumero2(num2);
	    peca.setOperacao("Cálculo da Área de uma peça prismática com a base triangular");
	    peca.setResultado(0.5 * num1 * num2);
	    return pecaRepository.save(peca);
	}
	
	
	//Calculo da area de uma peça prismática com a base circular
	@GetMapping("baseCircular/{num1}/{num2}")
	public Peca areaComBaseCircular (@PathVariable double num1, @PathVariable double num2) {
	    Peca peca = new Peca();
	    peca.setNumero1(num1);
	    peca.setNumero2(num2);
	    peca.setOperacao("Cálculo da Área de uma peça prismática com a base circular");
	    peca.setResultado(Math.PI * Math.pow(num1, 2) * num2);
	    return pecaRepository.save(peca);
	}
	
	
	@GetMapping("historico/findById/{id}")
	public Peca procuraPorId(@PathVariable Long id) {
		return pecaRepository.findById(id).orElse(null);
	}
	
	@GetMapping("/historico")
	public Iterable<Peca> getHistorico(){
		return pecaRepository.findAll();
	}
	
	@GetMapping("/historico/{qtd}")
	public Iterable<Peca> getHistorico(@PathVariable int qtd){
		return pecaRepository.findOperacoes(PageRequest.of(0, qtd));
	}
}