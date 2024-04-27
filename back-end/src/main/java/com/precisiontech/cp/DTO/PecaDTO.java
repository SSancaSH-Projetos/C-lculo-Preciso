package com.precisiontech.cp.DTO;

import com.precisiontech.cp.entity.MaoDeObra;
import com.precisiontech.cp.entity.Material;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PecaDTO {
    private Long id;
    private String codigo;
    private String nomeDaPeca;
    private Date dataDeCriacao;
    private List<Long> maosDeObraIds; // Lista de IDs de mãos de obra
    private Long materialId; // ID do material
}