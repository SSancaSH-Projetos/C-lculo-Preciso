package com.precisiontech.mvp03.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "Peca")
public class Peca implements Serializable {
    //atributos
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigoPeca;
    private String nomePeca;
    private String nomeMaterial;

    //construtor vazio
    public Peca() {}

    public Peca(Long id, String codigoPeca, String nomePeca, String nomeMaterial) {
        this.id = id;
        this.codigoPeca = codigoPeca;
        this.nomePeca = nomePeca;
        this.nomeMaterial = nomeMaterial;
    }

    public Long getId() {
        return id;
    }

    public String getCodigoPeca() {
        return codigoPeca;
    }

    public String getNomePeca() {
        return nomePeca;
    }

    public String getNomeMaterial() {
        return nomeMaterial;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCodigoPeca(String codigoPeca) {
        this.codigoPeca = codigoPeca;
    }

    public void setNomePeca(String nomePeca) {
        this.nomePeca = nomePeca;
    }

    public void setNomeMaterial(String nomeMaterial) {
        this.nomeMaterial = nomeMaterial;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Peca peca = (Peca) o;
        return Objects.equals(id, peca.id) && Objects.equals(codigoPeca, peca.codigoPeca) && Objects.equals(nomePeca, peca.nomePeca) && Objects.equals(nomeMaterial, peca.nomeMaterial);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, codigoPeca, nomePeca, nomeMaterial);
    }

    @Override
    public String toString() {
        return "Peca{" +
                "id=" + id +
                ", codigoPeca='" + codigoPeca + '\'' +
                ", nomePeca='" + nomePeca + '\'' +
                ", nomeMaterial='" + nomeMaterial + '\'' +
                '}';
    }
}
