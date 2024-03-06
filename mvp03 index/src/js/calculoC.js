document.getElementById("calcForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário
    
    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;

    // Criar um objeto com os dados a serem enviados
    var dados = {
        num1: num1,
        num2: num2
    };

    // Fazer a requisição usando fetch
    fetch("http://10.110.12.22:8080/pecas/volumeCilindro", {
    method: "POST", // Alterar para POST
    headers: {
        "Content-Type": "application/json" // Indicar que o corpo da requisição é JSON
    },
    body: JSON.stringify({num1: num1, num2: num2}) // Enviar os dados no corpo da requisição como JSON
})
.then(response => {
    if (response.ok) {
        // Resetar o formulário com o id "calcForm"
        document.getElementById("calcForm").reset();
        // Exibir uma mensagem de sucesso com o id "successMessage"
        window.location.href = 'resultado.html';
    } else {
        // Tratar erros de requisição, se necessário
        console.error("Erro na requisição:", response.status);
    }
})
.catch(error => {
    // Tratar erros de conexão, se necessário
    console.error("Erro na conexão:", error);
});
});

var parametros = new URLSearchParams(window.location.search);
var valor1 = parametros.get('valor1');
var valor2 = parametros.get('valor2');