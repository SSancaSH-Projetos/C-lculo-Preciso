
// Carrega os usuários quando a página é carregada
document.addEventListener('DOMContentLoaded', fetchUsuarios);

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
        window.location.reload();
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

// Função para buscar e exibir usuários na tabela
function fetchUsuarios() {
    fetch('http://localhost:8080/usuarios/alunos')
        .then(response => response.json())
        .then(data => exibirUsuarios(data))
        .catch(error => {
            console.error('Erro ao buscar usuários:', error);
        });
}

function exibirUsuarios(data) {
    const tableBody = document.getElementById('alunosTableBody');
    tableBody.innerHTML = '';

    data.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.curso}</td>
            <td>${usuario.email}</td>
            <td>${usuario.tipoUsuario}</td>
            <td>
                <button class="edit-btn" data-email="${usuario.email}"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn" data-email="${usuario.email}"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Adiciona manipulador de evento para os botões de editar
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const email = this.getAttribute('data-email');
            showEditForm(email);
        });
    });

    // Adiciona manipulador de evento para os botões de deletar
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const email = this.getAttribute('data-email');
            deleteUsuario(email);
        });
    });
}

function showEditForm(email) {
    fetch(`http://localhost:8080/usuarios/${email}`)
        .then(response => response.json())
        .then(usuario => {
            document.getElementById('editNome').value = usuario.nome;
            document.getElementById('editCurso').value = usuario.curso;
            document.getElementById('editTipoUsuario').value = usuario.tipoUsuario;
            document.getElementById('editSenha').value = usuario.senha;
            document.getElementById('editForm').setAttribute('data-email', email);
            document.getElementById('editFormContainer').style.display = 'block';
        })
        .catch(error => {
            console.error('Erro ao buscar detalhes do usuário:', error);
        });
}

function updateUsuario(email, usuarioDetails) {
    fetch(`http://localhost:8080/usuarios/${email}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioDetails)
    })
    .then(response => {
        if (response.ok) {
            console.log(`Usuário com e-mail ${email} atualizado com sucesso.`);
            fetchUsuarios(); // Atualiza a tabela após a atualização
            document.getElementById('editFormContainer').style.display = 'none';
        } else {
            console.error('Erro ao atualizar usuário:', response.status);
        }
    })
    .catch(error => {
        console.error('Erro ao atualizar usuário:', error);
    });
}

document.getElementById('editForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = this.getAttribute('data-email');
    const usuarioDetails = {
        nome: document.getElementById('editNome').value,
        curso: document.getElementById('editCurso').value,
        tipoUsuario: document.getElementById('editTipoUsuario').value,
        senha: document.getElementById('editSenha').value
    };
    updateUsuario(email, usuarioDetails);
});

document.getElementById('cancelEdit').addEventListener('click', function () {
    document.getElementById('editFormContainer').style.display = 'none';
});

function deleteUsuario(email) {
    fetch(`http://localhost:8080/usuarios/${email}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log(`Usuário com e-mail ${email} deletado com sucesso.`);
            fetchUsuarios(); // Atualiza a tabela após a exclusão
        } else {
            console.error('Erro ao deletar usuário:', response.status);
        }
    })
    .catch(error => {
        console.error('Erro ao deletar usuário:', error);
    });
}

// Carrega os usuários quando a página é carregada
document.addEventListener('DOMContentLoaded', fetchUsuarios);


