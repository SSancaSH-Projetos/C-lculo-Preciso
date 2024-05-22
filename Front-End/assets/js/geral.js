document.getElementById('logout').addEventListener('click', function () {
  destroyCookie('email'); 
  alert('Cookie destruído com sucesso!');
  window.location.href = '/index.html';
});


function verificarCookie() {
  var emailCookie = getCookie('email'); 

  if (emailCookie === "") {
    window.location.href = '/index.html';
  }
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Chama a função verificarCookie() quando a página é carregada
verificarCookie();
