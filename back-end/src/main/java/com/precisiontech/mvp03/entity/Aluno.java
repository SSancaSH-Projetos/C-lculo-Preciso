package com.precisiontech.mvp03.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.util.Objects;
@Entity
@DiscriminatorValue("aluno")
public class Aluno extends Usuario {
    private String numeroMatricula;
    private String anoInicioCurso;

    public Aluno() {
    }

    public Aluno(String nome, String email, String senha, String numeroMatricula, String anoInicioCurso) {
        super(nome, email, senha);
        this.numeroMatricula = numeroMatricula;
        this.anoInicioCurso = anoInicioCurso;
    }

    public String getNumeroMatricula() {
        return numeroMatricula;
    }

    public void setNumeroMatricula(String numeroMatricula) {
        this.numeroMatricula = numeroMatricula;
    }

    public String getAnoInicioCurso() {
        return anoInicioCurso;
    }

    public void setAnoInicioCurso(String anoInicioCurso) {
        this.anoInicioCurso = anoInicioCurso;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Aluno aluno = (Aluno) o;
        return Objects.equals(numeroMatricula, aluno.numeroMatricula) && Objects.equals(anoInicioCurso, aluno.anoInicioCurso);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), numeroMatricula, anoInicioCurso);
    }

    @Override
    public String toString() {
        return "Aluno{" +
                "numeroMatricula='" + numeroMatricula + '\'' +
                ", anoInicioCurso='" + anoInicioCurso + '\'' +
                '}';
    }
}