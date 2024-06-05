function carregarDadosDasPecasCompleto() {
    fetch("https://be-calculo-preciso.azurewebsites.net//pecas")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            const accordionContainer = document.getElementById("accordionExample");
  
            // Limpar accordion antes de adicionar novos dados
            accordionContainer.innerHTML = "";
  
            // Adicionar todas as peças
            data.forEach((peca, index) => {
                // Formatar a data de criação para uma representação legível
                const dataDeCriacao = new Date(peca.dataDeCriacao).toLocaleDateString();
  
                // Contar o número de sub-peças
                const quantidadeSubPecas = peca.subPecas ? peca.subPecas.length : 0;
  
                // Obter o nome da máquina
                const nomeDaMaquina = peca.maquina.map((maquina) => maquina.nome).join(', ');
  
                // Obter o nome do material
                const nomeDoMaterial = peca.material.nome;
  
                const responsavel = peca.maosDeObra.map((maosDeObra) => maosDeObra.profissional).join(', ');
  
                const accordionItem = `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading${index}">
                            <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="${index === 0}" aria-controls="collapse${index}">
                                ${peca.nomeDaPeca}
                            </button>
                        </h2>
                        <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p><strong>Código:</strong> ${peca.codigo}</p>
                                <p><strong>Volume Total:</strong> ${peca.volumeTotal}mm&#x00B3</p>
                                <p><strong>Preço:</strong> R$${peca.custoDeProducao}</p>
                                <p><strong>Data de Criação:</strong> ${dataDeCriacao}</p>
                                <p><strong>Quantidade de Sub-Peças:</strong> ${quantidadeSubPecas}</p>
                                <p><strong>Material:</strong> ${nomeDoMaterial}</p>
                                <p><strong>Responsável:</strong> ${responsavel}</p>
                                <button type="button" class="btn btn-primary" onclick="handleButtonClick('${peca.id}')">Peça completa</button>
                            </div>
                        </div>
                    </div>
                `;
                accordionContainer.innerHTML += accordionItem;
            });
        })
        .catch((error) => console.error("Erro ao buscar dados das peças:", error));
}


// Função que será chamada quando o botão for clicado
function handleButtonClick(codigoPeca) {
    window.location.href = 'relatorio.html?idPeca=' + encodeURIComponent(codigoPeca);
}

// Função que será executada quando a página for carregada
window.onload = function () {
    carregarDadosDasPecasCompleto();
};
