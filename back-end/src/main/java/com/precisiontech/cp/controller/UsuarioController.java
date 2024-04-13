package com.precisiontech.cp.controller;

import com.precisiontech.cp.repository.AlunoRepository;
import com.precisiontech.cp.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @PostMapping("/alunos")
    public void cadastrarAluno(@RequestBody Aluno aluno) {
        alunoRepository.save(aluno);
    }

    @PostMapping("/professores")
    public void cadastrarProfessor(@RequestBody Professor professor) {
        professorRepository.save(professor);
    }
}
