package com.precisiontech.cp.controller;

import com.precisiontech.cp.entity.Usuario;
import com.precisiontech.cp.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{email}")
    public ResponseEntity<Usuario> getUsuarioByEmail(@PathVariable String email) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(email);
        return usuarioOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Usuario usuarioLogin) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(usuarioLogin.getEmail());
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            if (usuario.getSenha().equals(usuarioLogin.getSenha())) {
                // Autenticação bem-sucedida
                return ResponseEntity.ok("{\"message\": \"Login bem-sucedido\"}");
            }
        }
        // Se o e-mail ou a senha estiverem incorretos, retorna status 401 (Unauthorized)
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Credenciais Inválidas\"}");
    }

    @PostMapping
    public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) {
        Usuario createdUsuario = usuarioRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUsuario);
    }

    @PutMapping("/{email}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable String email, @RequestBody Usuario usuarioDetails) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(email);
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            usuario.setNome(usuarioDetails.getNome());
            usuario.setCurso(usuarioDetails.getCurso());
            usuario.setTipoUsuario(usuarioDetails.getTipoUsuario());
            usuario.setSenha(usuarioDetails.getSenha());
            Usuario updatedUsuario = usuarioRepository.save(usuario);
            return ResponseEntity.ok(updatedUsuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable String email) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(email);
        if (usuarioOptional.isPresent()) {
            usuarioRepository.deleteById(email);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}