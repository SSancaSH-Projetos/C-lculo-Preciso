package com.precisiontech.cp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "preco_por_kg")
    private Double precoPorKg;

    @Column(name = "preco_cavaco")
    private Double precoCavaco;

    @JsonIgnore
    @OneToMany(mappedBy = "material")
    private List<Peca> pecas;

}