// Função para carregar os dados de mão de obra e atualizar o HTML
var subPecas = [];
var materiais = [];
var maoDeObra = [];

function carregarDadosMaoDeObra() {
    fetch('http://localhost:8080/maodeobra')
        .then(response => response.json())
        .then(data => {
            const selectMaoDeObra = document.getElementById('maoDeObra');
            // selectMaoDeObra.innerHTML = ''; // Limpa o conteúdo existente

            data.forEach(profissional => {
                const optionElement = document.createElement('option');
                optionElement.value = profissional.id;
                optionElement.textContent = `${profissional.profissional} - Preço por hora: R$ ${profissional.precoPorHora.toFixed(2)}`;
                selectMaoDeObra.appendChild(optionElement);
            });
        })
        .catch(error => console.error('Erro ao buscar dados de mão de obra:', error));
}

// Função para carregar os dados de máquinas e atualizar o HTML
function carregarDadosMaquinas() {
    fetch('http://localhost:8080/maquinas')
        .then(response => response.json())
        .then(data => {
            const selectMaquinas = document.getElementById('maquina');
            // selectMaquinas.innerHTML = ''; // Limpa o conteúdo existente

            data.forEach(maquina => {
                const optionElement = document.createElement('option');
                optionElement.value = maquina.id;
                optionElement.textContent = `${maquina.nome} - Preço por hora: R$ ${maquina.precoPorHora.toFixed(2)}`;
                selectMaquinas.appendChild(optionElement);
            });
        })
        .catch(error => console.error('Erro ao buscar dados de máquinas:', error));
}

// Função para carregar os dados de materiais e atualizar o HTML
function carregarDadosMateriais() {
    fetch('http://localhost:8080/material')
        .then(response => response.json())
        .then(data => {
            const listaDeMateriais = document.getElementById('material');
            // listaDeMateriais.innerHTML = ''; // Limpa o conteúdo existente

            data.forEach(material => {
                const optionElement = document.createElement('option');
                optionElement.value = material.id;
                optionElement.textContent = material.nome;
                listaDeMateriais.appendChild(optionElement);
            });
        })
        .catch(error => console.error('Erro ao buscar dados de materiais:', error));
}

function carregarNomesDasPecas() {
    fetch('http://localhost:8080/pecas/nome')
        .then(response => response.json())
        .then(data => {
            const listaDeNomesDePecas = document.getElementById('listaDeNomesDePecas');

            data.forEach(peca => {
                const optionElement = document.createElement('option');
                optionElement.textContent = peca.nomeDaPeca;
                listaDeNomesDePecas.appendChild(optionElement);
            });
        })
        .catch(error => console.error('Erro ao buscar nomes das peças:', error));
}

function carregarCodigoPeca() {
    fetch('http://localhost:8080/pecas/codigo')
        .then(response => response.json())
        .then(data => {
            const listaDeCodigosDePecas = document.getElementById('codigo');

            data.forEach(peca => {
                const optionElement = document.createElement('option');
                optionElement.textContent = peca.codigo;
                listaDeCodigosDePecas.appendChild(optionElement);
            });
        })
        .catch(error => console.error('Erro ao buscar o código das peças:', error));
}
// Função que será executada quando a página for carregada
window.onload = function() {
    // Chama as funções para carregar os dados
    carregarDadosMaoDeObra();
    carregarDadosMaquinas();
    carregarDadosMateriais();
    carregarNomesDasPecas();
    carregarCodigoPeca();
};
