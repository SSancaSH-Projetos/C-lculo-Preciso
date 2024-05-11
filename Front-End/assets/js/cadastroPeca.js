// variáveis para envio ao back-end
var subPecas = [];




// Carrega os dados para a página
fetch('http://localhost:8080/maodeobra')
  .then(response => response.json())
  .then(data => {
    const listaMaoDeObra = document.getElementById('listaMaoDeObra');

    data.forEach(profissional => {
      const itemLista = document.createElement('li');
      itemLista.innerHTML = `
      <div class="materiais-e-custos-item">
        <div>${profissional.profissional}</div>
        <div>Preço por hora: R$ ${profissional.precoPorHora.toFixed(2)}</div>
        <div class="materiais-e-custos-item-input">
          <input id="${profissional.id}qtdProfissionais" type="number" placeholder="Nº de profissionais"><br>
          <input id="${profissional.id}qtdHoras" type="number" placeholder="Quantidade de horas">
        <div>
      </div>
    `;
      listaMaoDeObra.appendChild(itemLista);
    });
  })
  .catch(error => console.error('Erro ao buscar dados de mão de obra:', error));


fetch('http://localhost:8080/maquinas')
  .then(response => response.json())
  .then(data => {
    const listaMaoDeObra = document.getElementById('listaMaquinas');

    data.forEach(maquina => {
      const itemLista = document.createElement('li');
      itemLista.innerHTML = `
      <div class="materiais-e-custos-item">
        <div>${maquina.nome}</div>
        <div>Preço por hora: R$ ${maquina.precoPorHora.toFixed(2)}</div>
        <div class="materiais-e-custos-item-input">
          <input id="${maquina.id}qtdMaquinas" type="number" placeholder="Nº de maquinas"><br>
          <input id="${maquina.id}qtdHoras" type="number" placeholder="Quantidade de horas">
        <div>
      </div>
    `;
      listaMaoDeObra.appendChild(itemLista);
    });
  })
  .catch(error => console.error('Erro ao buscar dados de mão de obra:', error));


fetch('http://localhost:8080/material')
  .then(response => response.json())
  .then(data => {
    const listaDeMateriais = document.getElementById('listaDeMateriais');

    data.forEach(maquina => {
      const option = document.createElement('option');
      option.value = maquina.id;
      option.text = maquina.nome;
      listaDeMateriais.appendChild(option);
    });
  })
  .catch(error => console.error('Erro ao buscar dados de materiais:', error));




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

function criarSubPartes() {
  var selectElement = document.querySelector("#formato-da-sub-peca");
  var geometria = selectElement.options[selectElement.selectedIndex].value;
  var dimensoes = {};

  if (geometria === "Cubica") {
    var nomeSubpeca = document.getElementById("nomePecaCubica").value;
    var lado = parseFloat(document.getElementById("ladoCubo").value);
    dimensoes.lado = lado;
    dimensoes.areaBase = lado * lado;
    dimensoes.volume = lado * lado * lado;
  }

  if (geometria === "Cilindrico") {
    var nomeSubpeca = document.getElementById("nomeCilindro").value;
    var raio = parseFloat(document.getElementById("raioCilindro").value);
    var altura = parseFloat(document.getElementById("alturaCilindro").value);
    dimensoes.raio = raio;
    dimensoes.alturaCilindro = altura;
    dimensoes.volume = Math.PI * Math.pow(raio, 2) * altura;
  }

  if (geometria === "Piramide") {
    var nomeSubpeca = document.getElementById("nomePiramide").value;
    var basePiramide = parseFloat(document.getElementById("basePiramide").value);
    var alturaPiramide = parseFloat(document.getElementById("alturaPiramide").value);
    if (!isNaN(basePiramide) && !isNaN(alturaPiramide)) {
      dimensoes.basePiramide = basePiramide;
      dimensoes.alturaPiramide = alturaPiramide;
      dimensoes.areaDaBasePiramide = 0.5 * basePiramide * alturaPiramide;
      dimensoes.volumePiramide = (1 / 3) * dimensoes.areaDaBasePiramide * alturaPiramide;
    } else {
      if (isNaN(basePiramide)) {
        document.getElementById("basePiramide").style.border = "2px solid red";
      }
      if (isNaN(alturaPiramide)) {
        document.getElementById("alturaPiramide").style.border = "2px solid red";
      }
      alert("Valores inválidos. Por favor, verifique os campos destacados em vermelho.");
      return; // Retorna sem adicionar à lista se os valores forem inválidos
    }
  }

  var objetoJSON = {
    nome: nomeSubpeca,
    raio: dimensoes.raio,
    alturaCilindro: dimensoes.alturaCilindro,
    volume: dimensoes.volume,
  };

  subPecas.push(objetoJSON);

  document.querySelector('.sub-pecas-adicionadas').innerHTML = '';

  subPecas.forEach(function (objeto) {
    var divSubPeca = document.createElement('div');
    divSubPeca.classList.add('sub-peca');
    divSubPeca.innerHTML = `
    <div class="nome-subpeca"><strong>Nome da Sub-peça:</strong> ${objeto.nome}</div>
    <div><strong>Geometria:</strong> Cilíndrica</div>
    <div><strong>Dimensões:</strong></div>
    <div style="margin-left: 3%;">
      <div><strong>Raio:</strong> ${objeto.raio} cm</div>
      <div><strong>Altura:</strong> ${objeto.alturaCilindro} cm</div>
      <div><strong>Volume:</strong> ${objeto.volume.toFixed(0)} mm³</div>
    </div>
  `;

    document.querySelector('.sub-pecas-adicionadas').appendChild(divSubPeca);
  });

  // Calcula a soma dos volumes
  var somaVolumes = subPecas.reduce(function (total, objeto) {
    return total + objeto.volume;
  }, 0);

  // Exibe a soma dos volumes na página
  var subPecasFinal = document.querySelector('.sub-pecas-final');
  subPecasFinal.innerHTML = `<span>Volume da peça: </span><input id="volumeDaPeca" class='input-volume' value=${somaVolumes.toFixed(0)}>`;
}


function handleSalvarPeca() {

  let codigo = document.getElementById("codPeca").value;
  let nomePeca = document.getElementById("nomePeca").value;
  let volumeDaPeca = document.getElementById("volumeDaPeca")?.value;
  let pesoDoTarugo = document.getElementById("tarugo").value;
  let listaDeMateriais = document.getElementById("listaDeMateriais");
  let valorDaOpcaoSelecionada = listaDeMateriais.value;

  console.log(subPecas)

  let dataToSubmit = {
    "codigo": codigo,
    "nomeDaPeca": nomePeca,
    "volumeTotal": volumeDaPeca,
    "custoDeProducao": 100.0,
    "tempoDeUsinagem": 12.5,
    "pesoTarugo": pesoDoTarugo,
    "quantidadeDeCavaco": 15.0,
    "valorDoCavaco": 50.0,
    "maosDeObraIds": [1],
    "maquinas": [1, 2],
    "materialId": valorDaOpcaoSelecionada,
    "subPecas": subPecas
  };

  fetch('http://localhost:8080/pecas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSubmit)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Dados enviados com sucesso:', data);
    })
    .catch(error => {
      console.error('Houve um problema ao enviar os dados:', error);
    });
}

