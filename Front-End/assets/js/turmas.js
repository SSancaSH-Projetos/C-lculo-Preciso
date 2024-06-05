function handledeletar(idParaDeletar) {
    console.log("entrei")

    var url = "https://be-calculo-preciso.azurewebsites.net//turmas" + "/" + idParaDeletar;

    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: ""
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Erro ao deletar Item");
            }
            return response.json();
        })
        .then(function (data) {
            console.log("Item deletado com sucesso");
        })
        .catch(function (error) {
            console.error("Erro:", error);
        });

    window.location.reload();
}

// Função genérica para abrir um modal
function abrirModal() {
    var modal = document.getElementById('addTurmaModal');
    modal.style.display = "block";
}

// Função genérica para fechar um modal
function fecharModal() {
    var modal = document.getElementById('addTurmaModal');
    modal.style.display = "none";
}



document.addEventListener('DOMContentLoaded', function () {
    fetch('https://be-calculo-preciso.azurewebsites.net//turmas')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#turmas-table tbody');

            data.forEach(turma => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${turma.codTurma}</td>
                    <td>${turma.nome}</td>
                    <td><a onClick="handledeletar(${turma.id});" class="button-edit-delete"><i class="fa-solid fa-trash"></i></a></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao buscar turmas:', error));
});


function handleCadastrarTurma() {
    const nome = document.getElementById("nomeTurma").value;
    const codTurma = document.getElementById("codigoTurma").value;

    const data = {
        nome: nome,
        codTurma: codTurma,
    };

    fetch("https://be-calculo-preciso.azurewebsites.net//turmas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao criar turma");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Turma criada com sucesso:", data);
            window.location.href = "turmas.html";
        })
        .catch((error) => {
            console.error("Erro ao criar turma:", error);
        });
}


