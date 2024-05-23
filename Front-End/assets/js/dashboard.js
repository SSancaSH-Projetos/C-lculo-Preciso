document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/pecas")
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
      })
      .catch((error) =>
        console.error("Erro ao carregar as últimas peças:", error)
      );
  });


  function countAndDisplayPieces() {
    fetch("http://localhost:8080/pecas")
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
}

countAndDisplayPieces();


  