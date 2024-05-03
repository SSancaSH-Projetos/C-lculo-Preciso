document.getElementById('logout').addEventListener('click', function() {
    destroyCookie('email'); // Destruir o cookie com o nome 'email'
    alert('Cookie destruído com sucesso!');
    window.location.href = '/index.html'; 
  });