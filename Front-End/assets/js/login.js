document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir o comportamento padrão de envio do formulário

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const dadosLogin = {
      email: email,
      senha: senha
  };

  fetch('http://localhost:8080/usuarios/login', { // Endpoint de login
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosLogin)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Credenciais incorretas');
      }
      return response.json();
  })
  .then(data => {
      console.log('Login realizado com sucesso:', data);
      document.cookie = `email=${email}`;
      window.location.href = 'dashboard.html';
  })
  .catch(error => {
      console.error('Erro ao realizar o login:', error);
      // Mostrar um modal com a mensagem de erro
      const modal = document.getElementById('modal');
      modal.style.display = 'block';
      const modalContent = document.getElementById('modal-content');
      modalContent.innerText = error.message;
    
      // Adicionar evento de clique ao botão "Fechar" do modal
      const fecharModalBtn = document.getElementById('fechar-modal');
      fecharModalBtn.addEventListener('click', function() {
        modal.style.display = 'none'; // Ocultar o modal
      });
  });
});
