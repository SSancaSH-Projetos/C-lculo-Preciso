document
  .getElementById("criarTurmaButton")
  .addEventListener("click", function () {
    const nome = document.getElementById("nomeTurma").value;
    const codTurma = document.getElementById("codigoTurma").value;

    const data = {
      nome: nome,
      codTurma: codTurma,
    };

    fetch("http://localhost:8080/turmas", {
      method: "POST", // ou 'PUT', 'DELETE', etc. dependendo da sua API
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao criar turma");
        }
        return response.json();
      })
      .then((data) => {
        // Aqui você pode lidar com a resposta do servidor
        console.log("Turma criada com sucesso:", data);
        window.location.href = "professor.html"; // redirecionamento após criar a turma
      })
      .catch((error) => {
        console.error("Erro ao criar turma:", error);
        // Aqui você pode exibir uma mensagem de erro para o usuário, caso necessário
      });
  });
