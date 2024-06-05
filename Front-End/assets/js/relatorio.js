function carregarDadosDaPeca(idPeca) {
  fetch("http://localhost:8080/pecas/" + idPeca)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // Selecionar elementos do DOM
      const id = document.getElementById("id");
      const listaDeNomesDePecas = document.getElementById("listaDeNomesDePecas");
      const codigoPeca = document.getElementById("codigo");
      const volumeTotal = document.getElementById("volumeTotal");
      const custoDeProducao = document.getElementById("custoDeProducao");
      //const tempoDeUsinagem = document.getElementById("tempoDeUsinagem");
      const pesoTarugo = document.getElementById("pesoTarugo");
      //const quantidadeDeCavaco = document.getElementById("quantidadeDeCavaco");
      //const valorDoCavaco = document.getElementById("valorDoCavaco");
      const dataDeCriacao = document.getElementById("dataDeCriacao");
      const maoDeObra = document.getElementById("maoDeObra");
      const subPecas = document.getElementById("subPecas");
      const maquina = document.getElementById("maquina");
      const material = document.getElementById("material");
      const quantidadeSubPecas = document.getElementById("quantidadeSubPecas");

      // Preencher elementos com os dados recebidos
      id.innerHTML = data.id;
      listaDeNomesDePecas.innerHTML = data.nomeDaPeca;
      codigoPeca.innerHTML = data.codigo;
      volumeTotal.innerHTML = data.volumeTotal;
      custoDeProducao.innerHTML = data.custoDeProducao;
      //tempoDeUsinagem.innerHTML = data.tempoDeUsinagem;
      //quantidadeDeCavaco.innerHTML = data.quantidadeDeCavaco;
      pesoTarugo.innerHTML = data.pesoTarugo;
      //valorDoCavaco.innerHTML = data.valorDoCavaco;

      // Formatar e exibir a data de criação
      const dataCriacao = new Date(data.dataDeCriacao);
      const dataFormatada = `${dataCriacao.getDate()}/${dataCriacao.getMonth() + 1}/${dataCriacao.getFullYear()}`;
      dataDeCriacao.innerHTML = dataFormatada;

      // Exibir sub-peças
      if (Array.isArray(data.subPecas) && data.subPecas.length > 0) {
        subPecas.innerHTML = data.subPecas
          .map((subPeca) => `<li>Nome: ${subPeca.nome}, Código: ${subPeca.id}</li>`)
          .join('');
        console.log("Sub-peças carregadas");
        // Contar a quantidade de sub-peças e exibir na página
        if (quantidadeSubPecas) {
          quantidadeSubPecas.textContent = `${data.subPecas.length}`;
        } else {
          console.error("Elemento com id 'quantidadeSubPecas' não encontrado.");
        }
      } else {
        subPecas.innerHTML = 'Nenhuma sub peça encontrada.';
      }

      // Exibir mãos de obra
      if (Array.isArray(data.maosDeObra) && data.maosDeObra.length > 0) {
        maoDeObra.innerHTML = data.maosDeObra
          .map((mao) => `<li>Nome: ${mao.profissional}</li>`)
          .join('');
      } else {
        maoDeObra.innerHTML = 'Nenhuma mão de obra encontrada.';
      }

      // Exibir máquinas
      if (Array.isArray(data.maquina) && data.maquina.length > 0) {
        maquina.innerHTML = data.maquina
          .map((maq) => `<li>Nome: ${maq.nome}</li>`)
          .join('');
      } else {
        maquina.innerHTML = 'Nenhuma máquina encontrada.';
      }

      // Exibir material
      if (data.material && data.material.nome) {
        material.innerHTML = `Nome: ${data.material.nome}`;
      } else {
        material.innerHTML = 'Nenhum material encontrado.';
      }
    })
    .catch((error) => console.error("Erro ao buscar nomes das peças:", error));
}

// Função que será executada quando a página for carregada
window.onload = function () {
  if (window.location.search) {
    // Obter a URL atual
    var urlParams = new URLSearchParams(window.location.search);
    // Obter o valor do parâmetro idPeca
    var idPeca = urlParams.get("idPeca");
    // Carregar os dados da peça correspondente
    carregarDadosDaPeca(idPeca);
  }
};
