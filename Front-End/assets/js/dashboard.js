document.addEventListener("DOMContentLoaded", function () {
  fetch("https://be-calculo-preciso.azurewebsites.net//pecas")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("tabela-body");
      tbody.innerHTML = "";

      data.slice(-3).forEach((peca) => {
        const responsaveis = peca.maosDeObra.map((maoDeObra) => maoDeObra.profissional).join(', ');

        const row = `
            <tr>
              <td>${peca.nomeDaPeca}</td>
              <td>${responsaveis}</td>
              <td>${new Date(peca.dataDeCriacao).toLocaleDateString()}</td>
              <td>${peca.subPecas.length}</td>
              <td>R$ ${peca.custoDeProducao.toFixed(2)}</td>
            </tr>
          `;
        tbody.insertAdjacentHTML("beforeend", row);
      });

      countAndDisplayPieces(); // Chama a função countAndDisplayPieces após carregar os dados das peças
    })
    .catch((error) =>
      console.error("Erro ao carregar as últimas peças:", error)
    );
});

function countAndDisplayPieces() {
  fetch("https://be-calculo-preciso.azurewebsites.net//pecas")
      .then(response => {
          if (!response.ok) {
              throw new Error("Erro na requisição: " + response.status);
          }
          return response.json();
      })
      .then(data => {
          // Verifique se os dados foram recebidos corretamente
          if (!data || !Array.isArray(data)) {
              throw new Error("Dados inválidos recebidos do servidor");
          }
          // Contar o número de peças
          const numberOfPieces = data.length;
          // Selecionar o elemento <p> onde você deseja exibir o número de peças
          const pieceCountElement = document.getElementById("piece-count");
          if (!pieceCountElement) {
              throw new Error("Elemento 'piece-count' não encontrado");
          }
          // Exibir o número de peças no elemento <p>
          pieceCountElement.textContent = `${numberOfPieces}`;
      })
      .catch(error => {
          console.error("Erro ao buscar dados:", error);
      });

  countAndDisplayPiecesWithWeight(); // Chama a função countAndDisplayPiecesWithWeight
}

function countAndDisplayPiecesWithWeight() {
  // Requisição para obter as peças
  fetch("https://be-calculo-preciso.azurewebsites.net//pecas")
      .then(response => {
          if (!response.ok) {
              throw new Error("Erro na requisição: " + response.status);
          }
          return response.json();
      })
      .then(piecesData => {
          // Verifique se os dados das peças foram recebidos corretamente
          if (!piecesData || !Array.isArray(piecesData)) {
              throw new Error("Dados inválidos recebidos do servidor para as peças");
          }

          // Requisição para obter os materiais
          fetch("https://be-calculo-preciso.azurewebsites.net//material")
              .then(response => {
                  if (!response.ok) {
                      throw new Error("Erro na requisição: " + response.status);
                  }
                  return response.json();
              })
              .then(materialData => {
                  // Verifique se os dados dos materiais foram recebidos corretamente
                  if (!materialData || !Array.isArray(materialData)) {
                      throw new Error("Dados inválidos recebidos do servidor para os materiais");
                  }

                  // Mapear o ID do material para seus dados para facilitar o acesso
                  const materialMap = new Map(materialData.map(material => [material.id, material]));

                  // Calcular o peso total das peças
                  const totalWeight = piecesData.reduce((total, piece) => {
                      const material = materialMap.get(piece.material.id); // Acesso corrigido aos dados do material
                      if (material) {
                          const weight = piece.volumeTotal * material.densidade / 1000; // Cálculo corrigido do peso
                          total += weight;
                      }
                      return total;
                  }, 0);

                  // Selecionar o elemento <div> onde você deseja exibir o peso total
                  const totalWeightElement = document.getElementById("total-weight");
                  if (!totalWeightElement) {
                      throw new Error("Elemento 'total-weight' não encontrado");
                  }

                  // Exibir o peso total no elemento <div>
                  totalWeightElement.textContent = `${totalWeight.toFixed(2)} kg`;
              })
              .catch(error => {
                  console.error("Erro ao buscar dados dos materiais:", error);
              });
      })
      .catch(error => {
          console.error("Erro ao buscar dados das peças:", error);
      });
}
