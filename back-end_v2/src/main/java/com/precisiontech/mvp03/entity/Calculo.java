package com.precisiontech.mvp03.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Calculo")
public class Calculo implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String operacao;
	private double numero1;
	private double numero2;
	private double resultado;

	//construtor
	public Calculo(Long id, String operacao, double numero1, double numero2, double resultado) {
		this.id = id;
		this.operacao = operacao;
		this.numero1 = numero1;
		this.numero2 = numero2;
		this.resultado = resultado;
	}

	//construtor vazio
	public Calculo() {}

	//métodos getters e setters
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	//Método hashCode
	@Override
	public int hashCode() {
		return Objects.hash(id,numero1, numero2, operacao, resultado);
	}


	//Método equals
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Calculo other = (Calculo) obj;
		return Objects.equals(id, other.id) &&
				Double.doubleToLongBits(numero1) == Double.doubleToLongBits(other.numero1)
				&& Double.doubleToLongBits(numero2) == Double.doubleToLongBits(other.numero2)
				&& Objects.equals(operacao, other.operacao)
				&& Double.doubleToLongBits(resultado) == Double.doubleToLongBits(other.resultado);
	}


	//Métoo toString
	@Override
	public String toString() {
		return "Calculo [id=" + id + ", operacao=" + operacao + ", numero1=" + numero1 + ", numero2=" + numero2
				+ ", resultado=" + resultado + "]";
	}

	
	
}