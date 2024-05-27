function carregarDadosDasPecas() {
  fetch("http://localhost:8080/pecas")
      .then((response) => {
          if (!response.ok) {
              throw new Error("Network response was not ok " + response.statusText);
          }
          return response.json();
      })
      .then((data) => {
          const dataTableBody = document.getElementById("data-table").getElementsByTagName("tbody")[0];

          // Limpar tabela antes de adicionar novos dados
          dataTableBody.innerHTML = "";

          // Adicionar todas as peças
          data.forEach((peca) => {
              // Formatar a data de criação para uma representação legível
              const dataDeCriacao = new Date(peca.dataDeCriacao).toLocaleDateString();

              // Contar o número de sub-peças
              const quantidadeSubPecas = peca.subPecas ? peca.subPecas.length : 0;

              // Obter o nome da máquina
              const nomeDaMaquina = peca.maquina.map((maquina) => maquina.nome).join(', ');

              // Obter o nome do material
              const nomeDoMaterial = peca.material.nome;

              const responsavel = peca.maosDeObra.map((maosDeObra) => maosDeObra.profissional).join(', ');

              const mainRow = `
                  <tr>
                      <td>${peca.codigo}</td>
                      <td>${peca.nomeDaPeca}</td>
                      <td>${peca.volumeTotal}mm&#x00B3</td>
                      <td>R$${peca.custoDeProducao}</td>
                      <td>${peca.tempoDeUsinagem}h</td>
                  </tr>
              `;
              dataTableBody.innerHTML += mainRow;
          });
      })
      .catch((error) => console.error("Erro ao buscar dados das peças:", error));
}

// Função que será executada quando a página for carregada
window.onload = function () {
  carregarDadosDasPecas();
};

//aparece e some uma tabela