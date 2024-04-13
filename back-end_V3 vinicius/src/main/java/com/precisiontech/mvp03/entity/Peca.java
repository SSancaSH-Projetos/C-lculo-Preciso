package com.precisiontech.mvp03.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "Peca")
public class Peca implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigoPeca;
    private String nomePeca;
    private String nomeMaterial;

    @OneToMany(mappedBy = "peca", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Calculo> calculos = new ArrayList<>();

    public Peca(Long id, String codigoPeca, String nomePeca, String nomeMaterial, List<Calculo> calculos) {
        this.id = id;
        this.codigoPeca = codigoPeca;
        this.nomePeca = nomePeca;
        this.nomeMaterial = nomeMaterial;
        this.calculos = calculos;
    }

    public Peca() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoPeca() {
        return codigoPeca;
    }

    public void setCodigoPeca(String codigoPeca) {
        this.codigoPeca = codigoPeca;
    }

    public String getNomePeca() {
        return nomePeca;
    }

    public void setNomePeca(String nomePeca) {
        this.nomePeca = nomePeca;
    }

    public String getNomeMaterial() {
        return nomeMaterial;
    }

    public void setNomeMaterial(String nomeMaterial) {
        this.nomeMaterial = nomeMaterial;
    }

    public List<Calculo> getCalculos() {
        return calculos;
    }

    public void setCalculos(List<Calculo> calculos) {
        this.calculos = calculos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Peca peca = (Peca) o;
        return Objects.equals(id, peca.id) && Objects.equals(codigoPeca, peca.codigoPeca) && Objects.equals(nomePeca, peca.nomePeca) && Objects.equals(nomeMaterial, peca.nomeMaterial) && Objects.equals(calculos, peca.calculos);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, codigoPeca, nomePeca, nomeMaterial, calculos);
    }

    @Override
    public String toString() {
        return "Peca{" +
                "id=" + id +
                ", codigoPeca='" + codigoPeca + '\'' +
                ", nomePeca='" + nomePeca + '\'' +
                ", nomeMaterial='" + nomeMaterial + '\'' +
                ", calculos=" + calculos +
                '}';
    }
}