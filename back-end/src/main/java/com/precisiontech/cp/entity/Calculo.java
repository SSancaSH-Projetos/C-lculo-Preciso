package com.precisiontech.cp.entity;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "Calculo")
public class Calculo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String operacao;
	private double numero1;
	private double numero2;
	private double resultado;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "peca_id")
	private Peca peca;

	public Calculo(Long id, String operacao, double numero1, double numero2, double resultado, Peca peca) {
		this.id = id;
		this.operacao = operacao;
		this.numero1 = numero1;
		this.numero2 = numero2;
		this.resultado = resultado;
		this.peca = peca;
	}

	public Calculo() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOperacao() {
		return operacao;
	}

	public void setOperacao(String operacao) {
		this.operacao = operacao;
	}

	public double getNumero1() {
		return numero1;
	}

	public void setNumero1(double numero1) {
		this.numero1 = numero1;
	}

	public double getNumero2() {
		return numero2;
	}

	public void setNumero2(double numero2) {
		this.numero2 = numero2;
	}

	public double getResultado() {
		return resultado;
	}

	public void setResultado(double resultado) {
		this.resultado = resultado;
	}

	public Peca getPeca() {
		return peca;
	}

	public void setPeca(Peca peca) {
		this.peca = peca;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Calculo calculo = (Calculo) o;
		return Double.compare(numero1, calculo.numero1) == 0 && Double.compare(numero2, calculo.numero2) == 0 && Double.compare(resultado, calculo.resultado) == 0 && Objects.equals(id, calculo.id) && Objects.equals(operacao, calculo.operacao) && Objects.equals(peca, calculo.peca);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, operacao, numero1, numero2, resultado, peca);
	}

	@Override
	public String toString() {
		return "Calculo{" +
				"id=" + id +
				", operacao='" + operacao + '\'' +
				", numero1=" + numero1 +
				", numero2=" + numero2 +
				", resultado=" + resultado +
				", peca=" + peca +
				'}';
	}
}