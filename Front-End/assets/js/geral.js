document.addEventListener('DOMContentLoaded', function() {

  function togglePasswordVisibility(passwordField, toggleButton) {
    const passwordFieldType = passwordField.getAttribute('type');

    if (passwordFieldType === 'password') {
      passwordField.setAttribute('type', 'text');
      toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
      passwordField.setAttribute('type', 'password');
      toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
    }
  }

  const showPasswordButton = document.getElementById('showPassword');
  const passwordField = document.getElementById('senha');

  if (showPasswordButton && passwordField) {
    showPasswordButton.addEventListener('click', function() {
      togglePasswordVisibility(passwordField, showPasswordButton);
    });
  }

  const showConfirmPasswordButton = document.getElementById('showConfirmPassword');
  const confirmPasswordField = document.getElementById('confirmarSenha');

  if (showConfirmPasswordButton && confirmPasswordField) {
    showConfirmPasswordButton.addEventListener('click', function() {
      togglePasswordVisibility(confirmPasswordField, showConfirmPasswordButton);
    });
  }

  const logoutButton = document.getElementById('logout');
  
  if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      destroyCookie('email');
      alert('Cookie destruído com sucesso!');
      window.location.href = '/index.html';
    });
  }

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

  // Call verificarCookie() when the page is loaded
  verificarCookie();

});
