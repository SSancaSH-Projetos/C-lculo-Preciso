package com.precisiontech.mvp03.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.util.Objects;
@Entity
@DiscriminatorValue("professor")
public class Professor extends Usuario{
    private String departamento;
    private String disciplina;

    public Professor() {}

    public Professor(String nome, String email, String senha, String departamento, String disciplina) {
        super(nome, email, senha);
        this.departamento = departamento;
        this.disciplina = disciplina;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(String disciplina) {
        this.disciplina = disciplina;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Professor professor = (Professor) o;
        return Objects.equals(departamento, professor.departamento) && Objects.equals(disciplina, professor.disciplina);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), departamento, disciplina);
    }

    @Override
    public String toString() {
        return "Professor{" +
                "departamento='" + departamento + '\'' +
                ", disciplina='" + disciplina + '\'' +
                '}';
    }
}