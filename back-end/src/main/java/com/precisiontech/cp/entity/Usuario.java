package com.precisiontech.cp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String curso;
    private TipoUsuario tipoUsuario;
    private String email;
    private String senha;

    public enum TipoUsuario {
        ADMINISTRADOR,
        PROFESSOR,
        ALUNO
    }

}