function mostrarInputs() {
  var selectElement = document.querySelector("#formato-da-sub-peca");
  var selectedOption = selectElement.options[selectElement.selectedIndex].value;
  var inputsCubico = document.getElementById("inputCubico");
  var inputsCilindrico = document.getElementById("inputCilindrico");
  var inputPiramide = document.getElementById("inputPiramide");

  if (selectedOption === "none") {
    inputsCilindrico.style.display = "none";
  }

  if (selectedOption === "Cilindrico") {
    inputsCilindrico.style.display = "flex";
  } else {
    inputsCilindrico.style.display = "none";
  }

  if (selectedOption === "Cubica") {
    inputsCubico.style.display = "flex";
  } else {
    inputsCubico.style.display = "none";
  }

  console.log(selectedOption)
  if (selectedOption === "Piramide") {
    inputPiramide.style.display = "flex";
  } else {
    inputPiramide.style.display = "none";
  }
}
var listaObjetosJSON = []; // Lista para armazenar os objetos JSON criados

function criarObjetoJSON() {
  // Obter os elementos dos formulários
  var selectElement = document.querySelector("#formato-da-sub-peca");
  var geometria = selectElement.options[selectElement.selectedIndex].value;
  var dimensoes = {};

  // Dependendo do formato da sub-peça selecionado, obter os valores correspondentes
  if (geometria === "Cubica") {
    
  var nomeSubpeca = document.getElementById("nomePecaCubica").value;
    var lado = parseFloat(document.getElementById("ladoCubo").value); // Convertendo o valor para número
    dimensoes.lado = lado;

    // Calculando a área da base
    var areaBase = lado * lado;

    // Calculando o volume
    var volume = lado * lado * lado;

    // Adicionando os valores de área da base e volume ao objeto dimensoes
    dimensoes.areaBase = areaBase;
    dimensoes.volume = volume;
  }

  if (geometria === "Cilindrico") {
    
  var nomeSubpeca = document.getElementById("nomeCilindro").value;
    var raio = parseFloat(document.getElementById("raioCilindro").value);
    var altura = parseFloat(document.getElementById("alturaCilindro").value);

    // Calculando o volume
    var volume = Math.PI * Math.pow(raio, 2) * altura;

    // Criar o objeto dimensoes para armazenar os valores do cilindro
    dimensoes.raio = raio;
    dimensoes.altura = altura;
    dimensoes.volume = volume;
}

if (geometria === "Piramide") {
  var nomeSubpeca = document.getElementById("nomePiramide").value;
  var basePiramide = parseFloat(document.getElementById("basePiramide").value);
  var alturaPiramide = parseFloat(document.getElementById("alturaPiramide").value);

  // Verificar se os valores de base e altura são válidos
  if (!isNaN(basePiramide) && !isNaN(alturaPiramide)) {
      // Calculando a área da base da pirâmide
      var areaDaBasePiramide = 0.5 * basePiramide * alturaPiramide;

      // Calculando o volume da pirâmide
      var volumePiramide = (1/3) * areaDaBasePiramide * alturaPiramide;

      // Criar o objeto dimensoes para armazenar os valores da pirâmide
      dimensoes.basePiramide = basePiramide;
      dimensoes.alturaPiramide = alturaPiramide;
      dimensoes.areaDaBasePiramide = areaDaBasePiramide;
      dimensoes.volumePiramide = volumePiramide;
  } else {
      // Valores inválidos, exibir mensagem de erro e destacar os inputs incorretos
      if (isNaN(basePiramide)) {
          document.getElementById("basePiramide").style.border = "2px solid red";
      }
      if (isNaN(alturaPiramide)) {
          document.getElementById("alturaPiramide").style.border = "2px solid red";
      }
      alert("Valores inválidos. Por favor, verifique os campos destacados em vermelho.");
  }
}


  // Criar o objeto JSON com os dados
  var objetoJSON = {
    nomeSubpeca: nomeSubpeca,
    geometria: geometria,
    dimensoes: dimensoes,
  };
  console.log("teste", objetoJSON)

  // Adicionar o objeto JSON à lista
  listaObjetosJSON.push(objetoJSON);

// Limpar a div antes de adicionar novos elementos
document.querySelector('.sub-pecas-adicionadas').innerHTML = '';

// Iterar sobre a lista de objetos JSON e adicionar os valores à div
listaObjetosJSON.forEach(function(objeto) {
  var divSubPeca = document.createElement('div');
  divSubPeca.classList.add('sub-peca');
  divSubPeca.innerHTML = `
    <div class="nome-subpeca"><strong>Nome da Sub-peça:</strong> ${objeto.nomeSubpeca}</div>
    <div><strong>Geometria:</strong> ${objeto.geometria}</div>
    <div><strong>Dimensões:</strong></div>
  `;

  // Adicionar inputs específicos para cada tipo de peça
  if (objeto.geometria === "Cubica") {
    divSubPeca.innerHTML += `
      <div style="margin-left: 3%;">
        <div><strong>Lado:</strong> ${objeto.dimensoes.lado} cm</div>
        <div><strong>Área da Base:</strong> ${objeto.dimensoes.areaBase} mm²</div>
        <div><strong>Volume:</strong> ${objeto.dimensoes.volume} mm³</div>
      </div>
    `;
  } else if (objeto.geometria === "Cilindrico") {
    divSubPeca.innerHTML += `
      <div style="margin-left: 3%;">
        <div><strong>Raio:</strong> ${objeto.dimensoes.raio} cm</div>
        <div><strong>Altura:</strong> ${objeto.dimensoes.altura} cm</div>
        <div><strong>Volume:</strong> ${objeto.dimensoes.volume} mm³</div>
      </div>
    `;
  } else if (objeto.geometria === "Piramide") {
    divSubPeca.innerHTML += `
      <div style="margin-left: 3%;">
        <div><strong>Lado da Base da Pirâmide:</strong> ${objeto.dimensoes.basePiramide} cm</div>
        <div><strong>Altura da Piramide:</strong> ${objeto.dimensoes.alturaPiramide} cm</div>
        <div><strong>Área da Base da Pirâmide:</strong> ${objeto.dimensoes.areaDaBasePiramide} mm²</div>
        <div><strong>Volume da Pirâmide:</strong> ${objeto.dimensoes.volumePiramide} mm³</div>
      </div>
    `;
  }

  document.querySelector('.sub-pecas-adicionadas').appendChild(divSubPeca);
});

// Calcular a soma dos volumes
var somaVolumes = listaObjetosJSON.reduce(function(total, objeto) {
  return total + objeto.dimensoes.volume;
}, 0);

// Criar um elemento para exibir a soma dos volumes
var divSomaVolumes = document.createElement('div');
divSomaVolumes.classList.add('soma-volumes');
divSomaVolumes.textContent = 'Volume total: ' + somaVolumes.toFixed(0) + ' mm³ | '  + somaVolumes.toFixed(0)/1000 + ' cm³';

// Adicionar a div da soma dos volumes à classe 'sub-pecas-final'
var subPecasFinal = document.querySelector('.sub-pecas-final');
subPecasFinal.innerHTML = '';
subPecasFinal.appendChild(divSomaVolumes);
}