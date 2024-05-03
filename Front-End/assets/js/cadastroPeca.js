function mostrarOpcoes() {
  var opcoesContainer = document.getElementById("opcoes");
  if (opcoesContainer.style.display === "none") {
    opcoesContainer.style.display = "block";
  } else {
    opcoesContainer.style.display = "none";
  }
}

function mostrarOpcoesAdicionarPeca() {
  var containerSubpeca = document.getElementById("opcoes");
  if (containerSubpeca.style.display === "none") {
    containerSubpeca.style.display = "block";
  } else {
    containerSubpeca.style.display = "none";
  }
}

function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function openPopup(componente) {
  document.getElementById("myPopup").style.display = "block";
  document.getElementById("popupContent").innerText =
    "Você selecionou: " + componente;
}

function closePopup() {
  document.getElementById("myPopup").style.display = "none";
}
