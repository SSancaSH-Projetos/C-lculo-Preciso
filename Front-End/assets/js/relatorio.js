// Função para carregar os dados de mão de obra e atualizar o HTML
var subPecas = [];
var materiais = [];
var maoDeObra = [];

function carregarDadosDaPeca(idPeca) {
  fetch("http://localhost:8080/pecas/" + idPeca)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const listaDeNomesDePecas = document.getElementById(
        "listaDeNomesDePecas"
      );
      const codigoPeca = document.getElementById(
        "codigo"
      );

      const maoDeObra = document.getElementById(
        "maoDeObra"
      );

      const maquinaPeca = document.getElementById(
        "maquina"
      );

      const materialPeca = document.getElementById(
        "material"
      );


      listaDeNomesDePecas.innerHTML = data.nomeDaPeca;
      codigoPeca.innerHTML = data.codigo;

      if (Array.isArray(data.maosDeObra) && data.maosDeObra.length > 0) {
        maoDeObra.innerHTML = data.maosDeObra
          .map((mao) => `<li>Profissional: ${mao.profissional}, Preço por Hora: ${mao.precoPorHora}</li>`)
          .join('');
      } else {
        maoDeObra.innerHTML = 'Nenhuma mão de obra encontrada.';
      }


      if (Array.isArray(data.maquina) && data.maquina.length > 0) {
        maquinaPeca.innerHTML = data.maquina
          .map((maquina) => `<li>Nome: ${maquina.nome}, Preço por Hora: ${maquina.precoPorHora}</li>`)
          .join('');
      } else {
        maquinaPeca.innerHTML = 'Nenhuma máquina encontrada.';
      }

      if (data.material) {
        materialPeca.innerHTML = `Nome: ${data.material.nome}, Preço por Kg: ${data.material.precoPorKg}, Preço Cavaco: ${data.material.precoCavaco}`;
      } else {
        materialPeca.innerHTML = 'Nenhum material encontrado.';
      }
    })
    .catch((error) => console.error("Erro ao buscar nomes das peças:", error));
}

// Função que será executada quando a página for carregada
window.onload = function () {
  if (window.location.search) {
    // Obtenha a URL atual
    var urlParams = new URLSearchParams(window.location.search);

    // Obtenha o valor do parâmetro idPeca
    var idPeca = urlParams.get("idPeca");

    carregarDadosDaPeca(idPeca);
  }
};

//  fetch('http://localhost:8080/pecas')
//    .then(response => response.json())
//    .then(data => {
//      const listaDeMateriais = document.getElementById('listaDePecas');

//      data.forEach(peca => {
//        const option = document.createElement('option');
//        option.value = peca.codigo;
//        option.text = peca.nomeDaPeca;
//        option.value = peca.material;
//        option.value = peca.maosDeObra;
//        listaDeMateriais.appendChild(option);
//      });
//  })
//  .catch(error => console.error('Erro ao buscar dados das peças', error));

// Exemplo: http://127.0.0.1:5500/relatorio.html?idPeca=4



