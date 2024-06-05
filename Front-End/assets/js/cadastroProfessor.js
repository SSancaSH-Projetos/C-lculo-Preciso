function cadastrarUsuario() {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("usuario").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const PROFESSOR = document.getElementById("professor").checked;
    const ALUNO = document.getElementById("aluno").checked;

    const data = {
      nome,
      email,
      senha,
      confirmarSenha,
      tipoUsuario: PROFESSOR ? "PROFESSOR" : ALUNO ? "ALUNO" : null, // Verifica qual botão está selecionado
    };

    // Verifica se o email já está em uso
    try {
      const response = await fetch(`http://localhost:8080/usuarios/${email}`);
      if (response.ok) {
        const responseData = await response.json();
        // Se o email já estiver em uso, exiba um alerta
        alert("Este email já está em uso. Por favor, escolha outro.");
        return;
      }
    } catch (error) {
      console.error("Erro ao verificar email:", error);
    }

    // Se o email não estiver em uso, envie os dados para o servidor para criar a conta
    try {
      const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("Resposta do servidor:", responseData);

      // Redireciona para a página index.html após o envio bem-sucedido
      window.location.href = "index.html";
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  });
}

document.getElementById("cadastro").addEventListener("click", cadastrarUsuario);
