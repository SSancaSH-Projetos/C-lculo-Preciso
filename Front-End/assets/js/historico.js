function carregarDadosDasPecas() {
  fetch("http://localhost:8080/pecas")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const dataTableBody = document
        .getElementById("data-table")
        .getElementsByTagName("tbody")[0];

      // Limpar tabela antes de adicionar novos dados
      dataTableBody.innerHTML = "";

      // Adicionar todas as peças
      data.forEach((peca) => {
        const mainRow = `
                    <tr>
                        <td>${peca.id}</td>
                        <td>${peca.nomeDaPeca}</td>
                        <td>${
                          Array.isArray(peca.subPecas)
                            ? peca.subPecas.length
                            : 0
                        }</td>
                        <td>${peca.codigo}</td>
                    </tr>
                `;
        dataTableBody.innerHTML += mainRow;

        // Adicionar sub peças, se houver
        if (Array.isArray(peca.subPecas) && peca.subPecas.length > 0) {
          peca.subPecas.forEach((subPeca) => {
            const subRow = `
                            <tr>
                                <td>${subPeca.id}</td>
                                <td>${subPeca.nomePeca}</td>
                                <td>${subPeca.quantidade}</td>
                                <td>${subPeca.codigo}</td>
                            </tr>
                        `;
            dataTableBody.innerHTML += subRow;
          });
        }
      });
    })
    .catch((error) => console.error("Erro ao buscar dados das peças:", error));
}

// Função que será executada quando a página for carregada
window.onload = function () {
  carregarDadosDasPecas();
};
