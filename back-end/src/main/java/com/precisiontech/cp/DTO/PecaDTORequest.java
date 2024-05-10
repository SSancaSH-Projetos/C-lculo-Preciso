package com.precisiontech.cp.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PecaDTORequest {
    private Long id;
    private String codigo;
    private String nomeDaPeca;
    private Date dataDeCriacao;
    private List<Long> maosDeObraIds;
    private List<Long> maquinas;
    private Long materialId;
    private List<SubPecaDTORequest> subPecas;
}