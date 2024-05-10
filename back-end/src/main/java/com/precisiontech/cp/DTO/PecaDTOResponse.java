package com.precisiontech.cp.DTO;

import com.precisiontech.cp.entity.MaoDeObra;
import com.precisiontech.cp.entity.Maquina;
import com.precisiontech.cp.entity.Material;
import com.precisiontech.cp.entity.SubPeca;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PecaDTOResponse {
    private Long id;
    private String codigo;
    private String nomeDaPeca;
    private Date dataDeCriacao;
    private List<MaoDeObra> maosDeObra;
    private List<Maquina> maquina;
    private Material material;
    private List<SubPeca> subPecas;
}