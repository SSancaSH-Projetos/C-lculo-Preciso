// Função para buscar e exibir usuários na tabela
function fetchUsuarios() {
    fetch('http://localhost:8080/usuarios/alunos')
        .then(response => response.json())
        .then(data => exibirUsuarios(data))
        .catch(error => {
            console.error('Erro ao buscar usuários:', error);
        });
}

// Função para exibir usuários na tabela
function exibirUsuarios(data) {
    const tableBody = document.getElementById('alunosTableBody');
    tableBody.innerHTML = '';

    data.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.curso}</td>
            <td>${usuario.tipoUsuario}</td>
            <td>
                <i class="fa-solid fa-pen"></i>
                <i class="fa-solid fa-trash"></i>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para abrir o modal de adicionar aluno
function abrirModal() {
    var modal = document.getElementById("addStudentModal");
    modal.style.display = "block";
}

// Função para fechar o modal de adicionar aluno
function fecharModal() {
    var modal = document.getElementById("addStudentModal");
    modal.style.display = "none";
}

// Função para submeter o formulário de adicionar aluno
function submeterFormulario(event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    var formData = {
        email: document.getElementById("email").value,
        nome: document.getElementById("name").value,
        curso: document.getElementById("course").value,
        tipoUsuario: "ALUNO",
        senha: document.getElementById("password").value
    };

    fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(function (response) {
        if (!response.ok) {
            throw new Error("Erro ao cadastrar aluno");
        }
        return response.json();
    })
    .then(function (data) {
        console.log("Aluno cadastrado com sucesso:", data);
        fecharModal();
        document.getElementById("studentForm").reset();
    })
    .catch(function (error) {
        console.error("Erro:", error);
    });
}

// Event Listeners
window.addEventListener('load', fetchUsuarios);

var btn = document.getElementById("addStudentButton");
btn.onclick = abrirModal;

var span = document.getElementsByClassName("close")[0];
span.onclick = fecharModal;

var form = document.getElementById("studentForm");
form.addEventListener("submit", submeterFormulario);
