function showDropdown() {
    var dropdown = document.getElementById("dropdown");
    var prismaticPiece = document.getElementById("prismaticPiece");
    var cylindricalPiece = document.getElementById("cylindricalPiece");
    
    if (prismaticPiece.checked || cylindricalPiece.checked) {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}

function calculate() {
    var shape = document.getElementById("shape").value;
    var param1 = parseFloat(document.getElementById("param1").value);
    var param2 = parseFloat(document.getElementById("param2").value);
    
    $.ajax({
        url: "/pecaPrismatica/baseQuadrada/" + param1,
        method: "GET",
        success: function(response) {
            $("#result").html("Área da base: " + response.areaDaBase);
        }
    });
}

const acoCheckboxes = document.querySelectorAll('input[type="checkbox"][value="Aço"]');
const aluminioCheckboxes = document.querySelectorAll('input[type="checkbox"][value="Alumínio"]');
const acoButton = document.getElementById('acoButton');
const aluminioButton = document.getElementById('aluminioButton');
const nextButton = document.getElementById('nextButton');

acoCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      aluminioCheckboxes.forEach(cb => cb.checked = false);
      acoButton.style.display = 'block';
      aluminioButton.style.display = 'none';
    } else {
      acoButton.style.display = 'none';
    }
  });
});

aluminioCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      acoCheckboxes.forEach(cb => cb.checked = false);
      aluminioButton.style.display = 'block';
      acoButton.style.display = 'none';
    } else {
      aluminioButton.style.display = 'none';
    }
  });
});

acoButton.addEventListener('click', function() {
  window.location.href = 'telaCalculoP.html'; // Substitua pelo URL correto
});

aluminioButton.addEventListener('click', function() {
  window.location.href = 'telaCalculoC.html'; // Substitua pelo URL correto
});

nextButton.addEventListener('click', function() {
  // Aqui você pode adicionar o comportamento do botão "Próxima Página"
});