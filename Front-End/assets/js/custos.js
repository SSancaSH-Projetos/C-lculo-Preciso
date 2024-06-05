// Função para fazer uma requisição GET para a API e exibir os dados na tabela
function fetchDataAndDisplay(url, tableId) {
    fetch(url)
        .then(response => response.json())
        .then(data => displayDataInTable(data, tableId))
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}

function handledeletar(idParaDeletar, tipoDelecao) {
    console.log(idParaDeletar, tipoDelecao);
    if (tipoDelecao == "maquinas-table") {
        deletar(idParaDeletar, "maquinas");
        window.location.reload();
    } else if (tipoDelecao == "materiais-table") {
        deletar(idParaDeletar, "material");
        window.location.reload();
    } else if (tipoDelecao == "mao-de-obra-table") {
        deletar(idParaDeletar, "maodeobra");
        window.location.reload();
    }
}


// Função para exibir os dados na tabela
function displayDataInTable(data, tableId) {
    const tableBody = document.getElementById(tableId);
    tableBody.innerHTML = '';

    data.forEach(item => {
        let rowData = '';
        if (!item.precoCavaco) {
            rowData = `
                <td>${item.profissional || item.nome}</td>
                <td>R$ ${(item.precoPorHora || 0).toFixed(2)}/h</td>
            `;
        } else {
            rowData = `
                <td>${item.nome}</td>
                <td>R$${(item.precoPorKg || 0).toFixed(2)}/kg</td>
                <td>R$${(item.precoCavaco || 0).toFixed(2)}</td>
                <td>${(item.densidade || 0).toFixed(2)} kg/m<sup>3</sup></td>
            `;
        }
        const row = document.createElement('tr');
        row.innerHTML = rowData + `
            <td>
                <a onClick="handleEditar(${item.id},'${tableId}');" class="button-edit-delete"><i class="fa-solid fa-pencil"></i></a>
                <a onClick="handledeletar(${item.id},'${tableId}');" class="button-edit-delete"><i class="fa-solid fa-trash"></i></a>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Chamar os endpoints para carregar os dados das tabelas
fetchDataAndDisplay('https://be-calculo-preciso.azurewebsites.net/material', 'materiais-table');
fetchDataAndDisplay('https://be-calculo-preciso.azurewebsites.net/maodeobra', 'mao-de-obra-table');
fetchDataAndDisplay('https://be-calculo-preciso.azurewebsites.net/maquinas', 'maquinas-table');

// Função genérica para abrir um modal
function abrirModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}

// Função genérica para fechar um modal
function fecharModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}

function cadastrar(tipoItem) {

    var formData;
    var url;
    var modalId;

    if (tipoItem.includes("material")) {
        formData = {
            nome: document.getElementById("nome").value,
            precoPorKg: parseFloat(document.getElementById("precoPorKg").value),
            precoCavaco: parseFloat(document.getElementById("precoCavaco").value),
            densidade: parseFloat(document.getElementById("densidade").value)
        };
        url = "https://be-calculo-preciso.azurewebsites.net/material";
        modalId = "addMaterialModal";
    } else if (tipoItem.includes("maodeobra")) {
        formData = {
            profissional: document.getElementById("profissional").value,
            precoPorHora: parseFloat(document.getElementById("valorPorHora").value),
        };
        url = "https://be-calculo-preciso.azurewebsites.net/maodeobra";
        modalId = "addMaoDeObraModal";
    } else if (tipoItem.includes("maquinas")) {
        formData = {
            nome: document.getElementById("nomeMaquina").value,
            precoPorHora: parseFloat(document.getElementById("valorOperacaoPorHora").value),
        };
        url = "https://be-calculo-preciso.azurewebsites.net/maquinas";
        modalId = "addMaquinaModal";
    }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Erro ao cadastrar item");
            }
            return response.json();
        })
        .then(function (data) {
            console.log("Item cadastrado com sucesso:", data);
            fecharModal(modalId);
            window.location.reload();
            
        })
        .catch(function (error) {
            console.error("Erro:", error);
        });
   // 

}


function deletar(idParaDeletar, endpoint) {


    var url = "https://be-calculo-preciso.azurewebsites.net//" + endpoint + "/" + idParaDeletar;

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

function handleCadastrar(tipo) {
    if (tipo == "material") {
        cadastrar("material");
    } else if (tipo == "maoDeObra") {
        cadastrar("maodeobra");
    } else if (tipo == "maquina") {
        cadastrar("maquinas");
    }
}


function handlerAbrirModal(qualModal) {
    console.log(qualModal);
    if (qualModal == "material") {
        abrirModal("addMaterialModal");
    } else if (qualModal == "maoDeObra") {
        abrirModal("addMaoDeObraModal");
    } else if (qualModal == "maquina") {
        abrirModal("addMaquinaModal");
    }

}

function handlerFecharModal(qualModal) {
    console.log(qualModal);
    if (qualModal == "material") {
        fecharModal("addMaterialModal");
    } else if (qualModal == "maoDeObra") {
        fecharModal("addMaoDeObraModal");
    } else if (qualModal == "maquina") {
        fecharModal("addMaquinaModal");
    }

}

// // Função para contar o número de peças no histórico e exibir no elemento <p>
// function countAndDisplayPieces() {
//     fetch("http://localhost:8080/pecas")
//         .then(response => response.json())
//         .then(data => {
//             // Contar o número de peças
//             const numberOfPieces = data.length;
//             // Selecionar o elemento <p> onde você deseja exibir o número de peças
//             const pieceCountElement = document.getElementById("piece-count");
//             // Exibir o número de peças no elemento <p>
//             pieceCountElement.textContent = `Número de peças no histórico: ${numberOfPieces}`;
//         })
//         .catch(error => {
//             console.error("Erro ao buscar dados:", error);
//         });
// }

// countAndDisplayPieces();


function handleEditar(id, tipoEdicao) {
    let url;
    let modalId;

    if (tipoEdicao === 'maquinas-table') {
        url = `https://be-calculo-preciso.azurewebsites.net//maquinas/${id}`;
        modalId = 'editMaquinaModal';
    } else if (tipoEdicao === 'materiais-table') {
        url = `https://be-calculo-preciso.azurewebsites.net//material/${id}`;
        modalId = 'editMaterialModal';
    } else if (tipoEdicao === 'mao-de-obra-table') {
        url = `https://be-calculo-preciso.azurewebsites.net//maodeobra/${id}`;
        modalId = 'editMaoDeObraModal';
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (tipoEdicao === 'maquinas-table') {
                document.getElementById('editNomeMaquina').value = data.nome;
                document.getElementById('editValorOperacaoPorHora').value = data.precoPorHora;
                document.getElementById('editMaquinaId').value = id;
            } else if (tipoEdicao === 'materiais-table') {
                document.getElementById('editNome').value = data.nome;
                document.getElementById('editPrecoPorKg').value = data.precoPorKg;
                document.getElementById('editPrecoCavaco').value = data.precoCavaco;
                document.getElementById('editDensidade').value = data.densidade;
                document.getElementById('editMaterialId').value = id;
            } else if (tipoEdicao === 'mao-de-obra-table') {
                document.getElementById('editProfissional').value = data.profissional;
                document.getElementById('editValorPorHora').value = data.precoPorHora;
                document.getElementById('editMaoDeObraId').value = id;
            }
            abrirModal(modalId);
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

function atualizar(tipoItem) {
    let formData;
    let url;
    let id;
    let modalId;

    if (tipoItem === 'material') {
        id = document.getElementById('editMaterialId').value;
        formData = {
            nome: document.getElementById('editNome').value,
            precoPorKg: parseFloat(document.getElementById('editPrecoPorKg').value),
            precoCavaco: parseFloat(document.getElementById('editPrecoCavaco').value),
            densidade: parseFloat(document.getElementById('editDensidade').value),
        };
        url = `https://be-calculo-preciso.azurewebsites.net//material/${id}`;
        modalId = 'editMaterialModal';
    } else if (tipoItem === 'maodeobra') {
        id = document.getElementById('editMaoDeObraId').value;
        formData = {
            profissional: document.getElementById('editProfissional').value,
            precoPorHora: parseFloat(document.getElementById('editValorPorHora').value),
        };
        url = `https://be-calculo-preciso.azurewebsites.net//maodeobra/${id}`;
        modalId = 'editMaoDeObraModal';
    } else if (tipoItem === 'maquinas') {
        id = document.getElementById('editMaquinaId').value;
        formData = {
            nome: document.getElementById('editNomeMaquina').value,
            precoPorHora: parseFloat(document.getElementById('editValorOperacaoPorHora').value),
        };
        url = `https://be-calculo-preciso.azurewebsites.net//maquinas/${id}`;
        modalId = 'editMaquinaModal';
    }

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar item');
            }
            return response.json();
        })
        .then(data => {
            console.log('Item atualizado com sucesso:', data);
            fecharModal(modalId);
           window.location.reload(); // Atualiza a página para refletir as mudanças
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}





