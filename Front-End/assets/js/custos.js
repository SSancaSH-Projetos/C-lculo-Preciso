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
    } else if (tipoDelecao == "materiais-table") {
        deletar(idParaDeletar, "material");
    } else if (tipoDelecao == "mao-de-obra-table") {
        deletar(idParaDeletar, "maodeobra");
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
                <td>R$ ${item.precoPorHora.toFixed(2)}/h</td>
            `;
        } else {
            rowData = `
                <td>${item.nome}</td>
                <td>R$ ${item.precoPorKg.toFixed(2)}/kg</td>
                <td>R$ ${item.precoCavaco.toFixed(2)}</td>
            `;
        }
        const row = document.createElement('tr');
        row.innerHTML = rowData + `
            <td>
                <a class="button-edit-delete"><i class="fa-solid fa-pencil"></i></a>
                <a onClick="handledeletar(${item.id},'${tableId}');" class="button-edit-delete"><i class="fa-solid fa-trash"></i></a>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Chamar os endpoints para carregar os dados das tabelas
fetchDataAndDisplay('http://localhost:8080/material', 'materiais-table');
fetchDataAndDisplay('http://localhost:8080/maodeobra', 'mao-de-obra-table');
fetchDataAndDisplay('http://localhost:8080/maquinas', 'maquinas-table');

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
        };
        url = "http://localhost:8080/material";
        modalId = "addMaterialModal";
    } else if (tipoItem.includes("maodeobra")) {
        formData = {
            profissional: document.getElementById("profissional").value,
            precoPorHora: parseFloat(document.getElementById("valorPorHora").value),
        };
        url = "http://localhost:8080/maodeobra";
        modalId = "addMaoDeObraModal";
    } else if (tipoItem.includes("maquinas")) {
        formData = {
            nome: document.getElementById("nomeMaquina").value,
            precoPorHora: parseFloat(document.getElementById("valorOperacaoPorHora").value),
        };
        url = "http://localhost:8080/maquinas";
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
            document.getElementById(modalId).reset();
            
        })
        .catch(function (error) {
            console.error("Erro:", error);
        });
    window.location.reload();

}


function deletar(idParaDeletar, endpoint) {


    var url = "http://localhost:8080/" + endpoint + "/" + idParaDeletar;

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



