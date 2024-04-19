package com.precisiontech.cp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Peca")
public class Peca implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    private String nomeDaPeca;
    private Date dataDeCriacao;

    @OneToMany(mappedBy = "peca", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MaoDeObra> maosDeObra = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "material_id", referencedColumnName = "id")
    private Material material;

    @OneToMany(mappedBy = "peca", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Maquina> maquinas = new ArrayList<>();

}