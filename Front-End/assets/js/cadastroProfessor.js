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
  console.log(data);
  // Aqui você pode fazer o fetch dos dados para o servidor
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


