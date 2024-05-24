// variáveis para envio ao back-end
var subPecas = [];
var materiais = [];
var maoDeObra = [];
var maquina = [];
let tarugos = [];
let volumeDoTarugo = 0;
let volumeCavaco = 0;
let somaVolumes = 0;


// Carrega os dados para a página
fetch('http://localhost:8080/maodeobra')
  .then(response => response.json())
  .then(data => {
    const selectMaoDeObra = document.getElementById('selectMaoDeObra');

    const selectElement = document.createElement('select');
    selectElement.setAttribute('id', 'maoDeObraSelect');

    data.forEach(profissional => {
      const optionElement = document.createElement('option');
      optionElement.setAttribute('value', profissional.id);
      optionElement.textContent = `${profissional.profissional} - Preço por hora: R$ ${profissional.precoPorHora.toFixed(2)}`;
      selectElement.appendChild(optionElement);
    });

    selectMaoDeObra.appendChild(selectElement);
  })
  .catch(error => console.error('Erro ao buscar dados de mão de obra:', error));



// Carrega os dados para a página
fetch('http://localhost:8080/maquinas')
  .then(response => response.json())
  .then(data => {
    const selectMaquinas = document.getElementById('selectMaquinas');

    const selectElement = document.createElement('select');
    selectElement.setAttribute('id', 'maquinasSelect');

    data.forEach(maquina => {
      const optionElement = document.createElement('option');
      optionElement.setAttribute('value', maquina.id);
      optionElement.textContent = `${maquina.nome} - Preço por hora: R$ ${maquina.precoPorHora.toFixed(2)}`;
      selectElement.appendChild(optionElement);
    });

    selectMaquinas.appendChild(selectElement);
  })
  .catch(error => console.error('Erro ao buscar dados de máquinas:', error));



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
    var inputRetangulo = document.getElementById("inputRetangulo");
    var inputTrapezio = document.getElementById("inputTrapezio");
  
    if (selectedOption === "none") {
      inputsCubico.style.display = "none";
      inputsCilindrico.style.display = "none";
      inputPiramide.style.display = "none";
      inputRetangulo.style.display = "none";
      inputTrapezio.style.display = "none";
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
  
    if (selectedOption === "Piramide") {
      inputPiramide.style.display = "flex";
    } else {
      inputPiramide.style.display = "none";
    }
  
    if (selectedOption === "Retangulo") {
      inputRetangulo.style.display = "flex";
    } else {
      inputRetangulo.style.display = "none";
    }
  
    if (selectedOption === "Trapezio") {
      inputTrapezio.style.display = "flex";
    } else {
      inputTrapezio.style.display = "none";
    }
  }
  function criarSubPartes() {
    var selectElement = document.querySelector("#formato-da-sub-peca");
    var geometria = selectElement.options[selectElement.selectedIndex].value;
    var dimensoes = {};
    var nomeSubpeca;
  
    if (geometria === "Cubica") {
      nomeSubpeca = document.getElementById("nomePecaCubica").value;
      var lado = parseFloat(document.getElementById("ladoCubo").value);
      dimensoes.lado = lado;
      dimensoes.areaBase = lado * lado;
      dimensoes.volume = lado * lado * lado;
    }
  
    if (geometria === "Cilindrico") {
      nomeSubpeca = document.getElementById("nomeCilindro").value;
      var raio = parseFloat(document.getElementById("raioCilindro").value);
      var altura = parseFloat(document.getElementById("alturaCilindro").value);
      dimensoes.raio = raio;
      dimensoes.alturaCilindro = altura;
      dimensoes.volume = Math.PI * Math.pow(raio, 2) * altura;
    }
  
    if (geometria === "Piramide") {
      nomeSubpeca = document.getElementById("nomePiramide").value;
      var basePiramide = parseFloat(
        document.getElementById("basePiramide").value
      );
      var alturaPiramide = parseFloat(
        document.getElementById("alturaPiramide").value
      );
      if (!isNaN(basePiramide) && !isNaN(alturaPiramide)) {
        dimensoes.basePiramide = basePiramide;
        dimensoes.alturaPiramide = alturaPiramide;
        dimensoes.areaDaBasePiramide = 0.5 * basePiramide * alturaPiramide;
        dimensoes.volume =
          (1 / 3) * dimensoes.areaDaBasePiramide * alturaPiramide;
      } else {
        if (isNaN(basePiramide)) {
          document.getElementById("basePiramide").style.border = "2px solid red";
        }
        if (isNaN(alturaPiramide)) {
          document.getElementById("alturaPiramide").style.border =
            "2px solid red";
        }
        alert(
          "Valores inválidos. Por favor, verifique os campos destacados em vermelho."
        );
        return; // Retorna sem adicionar à lista se os valores forem inválidos
      }
    }
    if (geometria === "Retangulo") {
      nomeSubpeca = document.getElementById("nomeRetangulo").value;
      var base = parseFloat(document.getElementById("baseRetangulo").value);
      var altura = parseFloat(document.getElementById("alturaRetangulo").value);
      var comprimento = parseFloat(
        document.getElementById("comprimentoRetangulo").value
      );
      if (!isNaN(base) && !isNaN(altura) && !isNaN(comprimento)) {
        dimensoes.base = base;
        dimensoes.altura = altura;
        dimensoes.comprimento = comprimento;
        dimensoes.areaBase = base * altura;
        dimensoes.volume = base * altura * comprimento;
      } else {
        if (isNaN(base)) {
          document.getElementById("baseRetangulo").style.border = "2px solid red";
        }
        if (isNaN(altura)) {
          document.getElementById("alturaRetangulo").style.border =
            "2px solid red";
        }
        if (isNaN(comprimento)) {
          document.getElementById("comprimentoRetangulo").style.border =
            "2px solid red";
        }
        alert(
          "Valores inválidos. Por favor, verifique os campos destacados em vermelho."
        );
        return; // Retorna sem adicionar à lista se os valores forem inválidos
      }
    } else if (geometria === "Trapezio") {
      nomeSubpeca = document.getElementById("nomeTrapezio").value;
      var baseMenor = parseFloat(
        document.getElementById("baseMenorTrapezio").value
      );
      var baseMaior = parseFloat(
        document.getElementById("baseMaiorTrapezio").value
      );
      var altura = parseFloat(document.getElementById("alturaTrapezio").value);
      var comprimento = parseFloat(
        document.getElementById("comprimentoTrapezio").value
      );
      if (
        !isNaN(baseMenor) &&
        !isNaN(baseMaior) &&
        !isNaN(altura) &&
        !isNaN(comprimento)
      ) {
        dimensoes.baseMenor = baseMenor;
        dimensoes.baseMaior = baseMaior;
        dimensoes.altura = altura;
        dimensoes.comprimento = comprimento;
        dimensoes.areaBase = ((baseMenor + baseMaior) * altura) / 2;
        dimensoes.volume = ((baseMenor + baseMaior) / 2) * altura * comprimento;
      } else {
        if (isNaN(baseMenor)) {
          document.getElementById("baseMenorTrapezio").style.border =
            "2px solid red";
        }
        if (isNaN(baseMaior)) {
          document.getElementById("baseMaiorTrapezio").style.border =
            "2px solid red";
        }
        if (isNaN(altura)) {
          document.getElementById("alturaTrapezio").style.border =
            "2px solid red";
        }
        if (isNaN(comprimento)) {
          document.getElementById("comprimentoTrapezio").style.border =
            "2px solid red";
        }
        alert(
          "Valores inválidos. Por favor, verifique os campos destacados em vermelho."
        );
        return;
      }
    }
  

  var objetoJSON = {
    nome: nomeSubpeca,
    formato: geometria,
    ...dimensoes
  };

  subPecas.push(objetoJSON);

  document.querySelector('.sub-pecas-adicionadas').innerHTML = '';

  console.log("teste", subPecas)

  
  subPecas.forEach(function (objeto) {
    var divSubPeca = document.createElement("div");
    divSubPeca.classList.add("sub-peca");
    divSubPeca.innerHTML = `
      <div class="nome-subpeca"><strong>Nome da Sub-peça:</strong> ${objeto.nome}</div>
      <div><strong>Geometria:</strong> ${objeto.formato}</div>
      <div><strong>Dimensões:</strong></div>
      <div style="margin-left: 3%;">
        ${objeto.formato === "Cilindrico" ? `
          <div><strong>Raio:</strong> ${objeto.raio} cm</div>
          <div><strong>Altura:</strong> ${objeto.alturaCilindro} cm</div>`
          : ""}
        ${objeto.formato === "Cubica" ? `
          <div><strong>Lado:</strong> ${objeto.lado} cm</div>`
          : ""}
        ${objeto.formato === "Piramide" ? `
          <div><strong>Base:</strong> ${objeto.basePiramide} cm</div>
          <div><strong>Altura:</strong> ${objeto.alturaPiramide} cm</div>`
          : ""}
        ${objeto.formato === "Retangulo" ? `
          <div><strong>Base:</strong> ${objeto.base} cm</div>
          <div><strong>Altura:</strong> ${objeto.altura} cm</div>
          <div><strong>Comprimento:</strong> ${objeto.comprimento} cm</div>`
          : ""}
        ${objeto.formato === "Trapezio" ? `
          <div><strong>Base Menor:</strong> ${objeto.baseMenor} cm</div>
          <div><strong>Base Maior:</strong> ${objeto.baseMaior} cm</div>
          <div><strong>Altura:</strong> ${objeto.altura} cm</div>
          <div><strong>Comprimento:</strong> ${objeto.comprimento} cm</div>`
          : ""}
        <div><strong>Volume:</strong> ${objeto.volume.toFixed(0)} mm³</div>
      </div>
    `;
  
    document.querySelector(".sub-pecas-adicionadas").appendChild(divSubPeca);
  
    // Chama a função cavaco e atualiza a div #relatorio-cavaco
    var resultadoCavaco = cavaco();
    document.querySelector('#relatorio-cavaco').innerHTML = `<span>Resultado Cavaco: </span><input readonly id="resultadoCavaco" class='input-cavaco' value=${resultadoCavaco.toFixed(2)}>`;
  });
  
  // Calcula a soma dos volumes
  somaVolumes = subPecas.reduce(function (total, objeto) {
    return total + objeto.volume;
  }, 0);
  
  // Exibe a soma dos volumes na página
  var subPecasFinal = document.querySelector('#relatorio-subpecas');
  subPecasFinal.innerHTML = `<span>Volume da peça: </span><input readonly id="volumeDaPeca" class='input-volume' value=${somaVolumes.toFixed(0)}>`;
  console.log(somaVolumes.toFixed(0));
  
  // Função cavaco
  function cavaco() {
    var somadoOsVolumes = subPecas.reduce((acumulador, peca) => acumulador + peca.volume, 0);
    volumeCavaco = tarugos[0].volume.toFixed(2) - somadoOsVolumes; 
    volumeDoTarugo = tarugos[0].volume.toFixed(2);

    console.log(volumeCavaco);
    return volumeCavaco;
  }
}


function addMaoDeObra() {
  var id = maoDeObra.length + 1; // Gera um ID sequencial
  var nome = document.getElementById("maoDeObraSelect").value;
  var numeroDeProfissionais = parseInt(document.getElementById("numeroDeProfissionais").value);
  var quantidadeDeHorasProfissional = parseInt(document.getElementById("quantidadeDeHorasProfissional").value);

  console.log(id,nome,numeroDeProfissionais, quantidadeDeHorasProfissional);

  if (nome && !isNaN(numeroDeProfissionais) && !isNaN(quantidadeDeHorasProfissional)) {
      var maoDeObraObj = {
          id: id,
          nome: nome,
          numeroDeProfissionais: numeroDeProfissionais,
          quantidadeDeHorasProfissional: quantidadeDeHorasProfissional
      };

      maoDeObra.push(maoDeObraObj);

      document.getElementById("selectMaoDeObra").value = "";
      document.getElementById("numeroDeProfissionais").value = "";
      document.getElementById("quantidadeDeHorasProfissional").value = "";

      var listaMaoDeObra = document.getElementById("listaMaoDeObra");

      // Limpa o conteúdo atual da lista
      listaMaoDeObra.innerHTML = "";
  
      maoDeObra.forEach(function(maoDeObraObj) {
          var li = document.createElement("li");
          li.textContent = "Nome: " + maoDeObraObj.nome + ", Profissionais: " + maoDeObraObj.numeroDeProfissionais + ", Horas: " + maoDeObraObj.quantidadeDeHorasProfissional;
          listaMaoDeObra.appendChild(li);
      });

      // Calcula o total de profissionais demandados
      var totalProfissionais = maoDeObra.reduce((acc, curr) => acc + curr.numeroDeProfissionais, 0);
      
      // Calcula a quantidade total de horas demandadas
      var horasTotais = maoDeObra.reduce((acc, curr) => acc + curr.quantidadeDeHorasProfissional, 0);
      
      // Atualiza o elemento de resumo
      document.getElementById("relatorio-maoDeObra").textContent = "Total de Profissionais: " + totalProfissionais + ", Horas Totais: " + horasTotais;

  } else {
      alert("Por favor, preencha todos os campos corretamente.");
  }
}

function addMaquina() {
  var id = maquina.length + 1; // Gera um ID sequencial
  var nome = document.getElementById("maquinasSelect").value;
  var numeroDeMaquinas = parseInt(document.getElementById("numeroDeMaquinas").value);
  var quantidadeDeHorasMaquina = parseInt(document.getElementById("quantidadeDeHorasMaquina").value);

  console.log(id, nome, numeroDeMaquinas, quantidadeDeHorasMaquina);

  if (nome && !isNaN(numeroDeMaquinas) && !isNaN(quantidadeDeHorasMaquina)) {
      var maquinaObj = {
          id: id,
          nome: nome,
          numeroDeMaquinas: numeroDeMaquinas,
          quantidadeDeHorasMaquina: quantidadeDeHorasMaquina
      };

      maquina.push(maquinaObj);

      document.getElementById("selectMaquinas").value = "";
      document.getElementById("numeroDeMaquinas").value = "";
      document.getElementById("quantidadeDeHorasMaquina").value = "";

      var listaMaquinas = document.getElementById("listaMaquinas");

      // Limpa o conteúdo atual da lista
      listaMaquinas.innerHTML = "";

      maquina.forEach(function(maquinaObj) {
          var li = document.createElement("li");
          li.textContent = "Nome: " + maquinaObj.nome + ", Máquinas: " + maquinaObj.numeroDeMaquinas + ", Horas: " + maquinaObj.quantidadeDeHorasMaquina;
          listaMaquinas.appendChild(li);
      });

      // Calcula o total de máquinas demandadas
      var totalMaquinas = maquina.reduce((acc, curr) => acc + curr.numeroDeMaquinas, 0);

      // Calcula a quantidade total de horas demandadas
      var horasTotais = maquina.reduce((acc, curr) => acc + curr.quantidadeDeHorasMaquina, 0);

      // Atualiza o elemento de resumo
      document.getElementById("relatorio-maquinas").textContent = "Total de Máquinas: " + totalMaquinas + ", Horas Totais: " + horasTotais;


  } else {
      alert("Por favor, preencha todos os campos corretamente.");
  }
}



function handleSalvarPeca() {

  let codigo = document.getElementById("codPeca").value;
  let nomePeca = document.getElementById("nomePeca").value;
  let volumeDaPeca = document.getElementById("volumeDaPeca").value;
  let listaDeMateriais = document.getElementById("listaDeMateriais");
  let valorDaOpcaoSelecionada = listaDeMateriais.value;

  console.log(subPecas)

  let dataToSubmit = {
    "codigo": codigo,
    "nomeDaPeca": nomePeca,
    "volumeTotal": volumeDaPeca,
    "custoDeProducao": 100.0,
    "tempoDeUsinagem": 12.5,
    "pesoTarugo": volumeDoTarugo,
    "quantidadeDeCavaco": volumeCavaco,
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

function calcularVolumeDaPeca(volumeDaPeca) {
  const valorVolume = 1.0 * Math.pow(10, -6); // 1.0 × 10^-6 kg
  const resultado = volumeDaPeca * valorVolume;
  return resultado;
}



















function mostrarInputsTarugo() {
  var selectElement = document.querySelector("#formato-do-tarugo");
  var selectedOption = selectElement.options[selectElement.selectedIndex].value;
  var inputsCubico = document.getElementById("inputCubicoTarugo");
  var inputsCilindrico = document.getElementById("inputCilindricoTarugo");
  var inputPiramide = document.getElementById("inputPiramideTarugo");
  var inputRetangulo = document.getElementById("inputRetanguloTarugo");
  var inputTrapezio = document.getElementById("inputTrapezioTarugo");

  inputsCubico.style.display = "none";
  inputsCilindrico.style.display = "none";
  inputPiramide.style.display = "none";
  inputRetangulo.style.display = "none";
  inputTrapezio.style.display = "none";

  if (selectedOption === "Cilindrico") {
    inputsCilindrico.style.display = "flex";
  }

  if (selectedOption === "Cubica") {
    inputsCubico.style.display = "flex";
  }

  if (selectedOption === "Piramide") {
    inputPiramide.style.display = "flex";
  }

  if (selectedOption === "Retangulo") {
    inputRetangulo.style.display = "flex";
  }

  if (selectedOption === "Trapezio") {
    inputTrapezio.style.display = "flex";
  }
}

function criarTarugos() {
  var selectElement = document.querySelector("#formato-do-tarugo");
  var geometria = selectElement.options[selectElement.selectedIndex].value;
  var volume = 0;
  var nomeTarugo;

  if (geometria === "Cubica") {
    nomeTarugo = document.getElementById("nomeTarugoCubico").value;
    var lado = parseFloat(document.getElementById("ladoCuboTarugo").value);
    volume = lado * lado * lado;
  }

  if (geometria === "Cilindrico") {
    nomeTarugo = document.getElementById("nomeCilindroTarugo").value;
    var raio = parseFloat(document.getElementById("raioCilindroTarugo").value);
    var altura = parseFloat(document.getElementById("alturaCilindroTarugo").value);
    volume = Math.PI * raio * raio * altura;
  }

  if (geometria === "Piramide") {
    nomeTarugo = document.getElementById("nomePiramideTarugo").value;
    var ladoBasePiramide = parseFloat(document.getElementById("basePiramideTarugo").value);
    var alturaPiramide = parseFloat(document.getElementById("alturaPiramideTarugo").value);
    volume = (1 / 3) * (ladoBasePiramide * ladoBasePiramide) * alturaPiramide;
  }

  if (geometria === "Retangulo") {
    nomeTarugo = document.getElementById("nomeRetanguloTarugo").value;
    var baseRetangulo = parseFloat(document.getElementById("baseRetanguloTarugo").value);
    var alturaRetangulo = parseFloat(document.getElementById("alturaRetanguloTarugo").value);
    var comprimentoRetangulo = parseFloat(document.getElementById("comprimentoRetanguloTarugo").value);
    volume = baseRetangulo * alturaRetangulo * comprimentoRetangulo;
  }

  if (geometria === "Trapezio") {
    nomeTarugo = document.getElementById("nomeTrapezioTarugo").value;
    var baseMenorTrapezio = parseFloat(document.getElementById("baseMenorTrapezioTarugo").value);
    var baseMaiorTrapezio = parseFloat(document.getElementById("baseMaiorTrapezioTarugo").value);
    var alturaTrapezio = parseFloat(document.getElementById("alturaTrapezioTarugo").value);
    var comprimentoTrapezio = parseFloat(document.getElementById("comprimentoTrapezioTarugo").value);
    volume = ((baseMenorTrapezio + baseMaiorTrapezio) / 2) * alturaTrapezio * comprimentoTrapezio;
  }

  var tarugo = {
    nomeTarugo: nomeTarugo,
    geometria: geometria,
    volume: volume,
  };

  tarugos.push(tarugo);
  listarTarugos();
}

function listarTarugos() {
  var tarugosAdicionadosDiv = document.querySelector(".tarugos-adicionados");
  tarugosAdicionadosDiv.innerHTML = ""; // Limpa a lista antes de atualizá-la

  if (tarugos.length === 0) {
    tarugosAdicionadosDiv.textContent = "Não há tarugos adicionados ainda.";
    return;
  }

  tarugos.forEach(function (tarugo) {
    var tarugoDiv = document.createElement("div");
    tarugoDiv.classList.add("tarugo");

    var tituloTarugo = document.createElement("h3");
    tituloTarugo.textContent = tarugo.nomeTarugo + " (" + tarugo.geometria + ")";

    var volumeP = document.createElement("p");
    volumeP.textContent = "Volume: " + tarugo.volume.toFixed(2);

    tarugoDiv.appendChild(tituloTarugo);
    tarugoDiv.appendChild(volumeP);
    tarugosAdicionadosDiv.appendChild(tarugoDiv);
    console.log(tarugo.volume.toFixed(2));
  });
}

// Densidade fixa de 1000 kg/m³
const densidade = 1000;

/**
 * Converte volume fixo (somaVolumes) em milímetros cúbicos para quilogramas
 * utilizando densidade fixa de 1000 kg/m³.
 *
 * @returns {number} - Massa em quilogramas.
 */
function calcularKG() {
    // Converter volume de milímetros cúbicos para metros cúbicos
    const volumeM3 = somaVolumes * 1e-9;
    
    // Calcular a massa em quilogramas
    const massaKg = volumeM3 * densidade;
    console.log(massaKg);
    return massaKg;
}

// Calcular a massa em quilogramas
const massa = calcularKG();

console.log(`Massa: ${massa} kg`); // Saída: Massa: 0.005 kg