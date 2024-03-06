
document.addEventListener('DOMContentLoaded', function () {
    const quadradaCheckboxes = document.querySelectorAll('input[type="checkbox"][value="Quadrada"]');
    const retangularCheckboxes = document.querySelectorAll('input[type="checkbox"][value="Retangular"]');
    const circularCheckboxes = document.querySelectorAll('input[type="checkbox"][value="Circular"]');
    const triangularCheckboxes = document.querySelectorAll('input[type="checkbox"][value="Triangular"]');
    const quadradaButton = document.getElementById('quadradaButton');
    const retangularButton = document.getElementById('retangularButton');
    const circularButton = document.getElementById('circularButton');
    const triangularButton = document.getElementById('triangularButton');

    quadradaCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          retangularCheckboxes.forEach(cb => cb.checked = false);
          circularCheckboxes.forEach(cb => cb.checked = false);
          triangularCheckboxes.forEach(cb => cb.checked = false);
          quadradaButton.style.display = 'block';
          retangularButton.style.display = 'none';
          circularButton.style.display = 'none';
          triangularButton.style.display = 'none';
        } else {
          quadradaButton.style.display = 'none';
        }
      });
    });

    retangularCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          quadradaCheckboxes.forEach(cb => cb.checked = false);
          circularCheckboxes.forEach(cb => cb.checked = false);
          triangularCheckboxes.forEach(cb => cb.checked = false);
          retangularButton.style.display = 'block';
          quadradaButton.style.display = 'none';
          circularButton.style.display = 'none';
          triangularButton.style.display = 'none';
        } else {
          retangularButton.style.display = 'none';
        }
      });
    });

    circularCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          quadradaCheckboxes.forEach(cb => cb.checked = false);
          retangularCheckboxes.forEach(cb => cb.checked = false);
          triangularCheckboxes.forEach(cb => cb.checked = false);
          circularButton.style.display = 'block';
          quadradaButton.style.display = 'none';
          retangularButton.style.display = 'none';
          triangularButton.style.display = 'none';
        } else {
          circularButton.style.display = 'none';
        }
      });
    });

    triangularCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          quadradaCheckboxes.forEach(cb => cb.checked = false);
          retangularCheckboxes.forEach(cb => cb.checked = false);
          circularCheckboxes.forEach(cb => cb.checked = false);
          triangularButton.style.display = 'block';
          quadradaButton.style.display = 'none';
          retangularButton.style.display = 'none';
          circularButton.style.display = 'none';
        } else {
          triangularButton.style.display = 'none';
        }
      });
    });

    quadradaButton.addEventListener('click', function() {
      var opcoes = document.getElementById("opcoes");
    
    if (opcoes.style.display === "none") {
      opcoes.style.display = "block";
    } else {
      opcoes.style.display = "none";
    }
    });

    retangularButton.addEventListener('click', function() {
      var opcoes = document.getElementById("opcoes");
    
    if (opcoes.style.display === "none") {
      opcoes.style.display = "block";
    } else {
      opcoes.style.display = "none";
    }
    });

    // circularButton.addEventListener('click', function() {
    //   var opcoes = document.getElementById("opcoesRetangulo");
  
    // if (opcoes.style.display === "none") {
    //   opcoes.style.display = "block";
    // } else {
    //   opcoes.style.display = "none";
    // }
    // });

    triangularButton.addEventListener('click', function() {
      var opcoes = document.getElementById("opcoesTriangulo");
    
    if (opcoes.style.display === "none") {
      opcoes.style.display = "block";
    } else {
      opcoes.style.display = "none";
    }
    });
  });  

  function mostrarOpcoesQuadrado() {
    var checkbox = document.querySelector('input[name="material"][value="Quadrada"]');
    var opcoesQuadrada = document.getElementById('opcoesQuadrada');

    if (checkbox.checked) {
        opcoesQuadrada.style.display = 'block';
        opcoesRetangular.style.display = 'none';
        opcoesCircular.style.display = 'none';
        opcoesTriangular.style.display = 'none';
    } else {
        opcoesQuadrada.style.display = 'none';
    }
}

  function mostrarOpcoesRetangular() {
  var checkbox = document.querySelector('input[name="material"][value="Retangular"]');
  var opcoesRetangular = document.getElementById('opcoesRetangular');

  if (checkbox.checked) {
    opcoesQuadrada.style.display = 'none';
    opcoesRetangular.style.display = 'block';
    opcoesCircular.style.display = 'none';
    opcoesTriangular.style.display = 'none';
  } else {
      opcoesQuadrada.style.display = 'none';
  }
}

//   function mostrarOpcoesCircular() {
//   var checkbox = document.querySelector('input[name="material"][value="Circular"]');
//   var opcoesCircular = document.getElementById('opcoesCircular');

//   if (checkbox.checked) {
//     opcoesQuadrada.style.display = 'none';
//     opcoesRetangular.style.display = 'none';
//     opcoesCircular.style.display = 'block';
//     opcoesTriangular.style.display = 'none';
//   } else {
//       opcoesQuadrada.style.display = 'none';
//   }
// }

  function mostrarOpcoeTriangular() {
  var checkbox = document.querySelector('input[name="material"][value="Triangular"]');
  var opcoesTriangular = document.getElementById('opcoesTriangular');

  if (checkbox.checked) {
    opcoesQuadrada.style.display = 'none';
    opcoesRetangular.style.display = 'none';
    opcoesCircular.style.display = 'none';
    opcoesTriangular.style.display = 'block';
  } else {
      opcoesQuadrada.style.display = 'none';
  }
}