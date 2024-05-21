// variáveis para envio ao back-end
var subPecas = [];
var materiais = [];
var maoDeObra = [];
var maquina = [];


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
    <div class="nome-subpeca"><strong>Nome da Sub-peça:</strong> ${
      objeto.nome
    }</div>
    <div><strong>Geometria:</strong> ${objeto.formato}</div>
    <div><strong>Dimensões:</strong></div>
    <div style="margin-left: 3%;">
      ${
        objeto.formato === "Cilindrico"
          ? `
        <div><strong>Raio:</strong> ${objeto.raio} cm</div>
        <div><strong>Altura:</strong> ${objeto.alturaCilindro} cm</div>`
          : ""
      }
      ${
        objeto.formato === "Cubica"
          ? `
        <div><strong>Lado:</strong> ${objeto.lado} cm</div>`
          : ""
      }
      ${
        objeto.formato === "Piramide"
          ? `
        <div><strong>Base:</strong> ${objeto.basePiramide} cm</div>
        <div><strong>Altura:</strong> ${objeto.alturaPiramide} cm</div>`
          : ""
      }
      ${
        objeto.formato === "Retangulo"
          ? `
        <div><strong>Base:</strong> ${objeto.base} cm</div>
        <div><strong>Altura:</strong> ${objeto.altura} cm</div>
        <div><strong>Comprimento:</strong> ${objeto.comprimento} cm</div>`
          : ""
      }
      ${
        objeto.formato === "Trapezio"
          ? `
        <div><strong>Base Menor:</strong> ${objeto.baseMenor} cm</div>
        <div><strong>Base Maior:</strong> ${objeto.baseMaior} cm</div>
        <div><strong>Altura:</strong> ${objeto.altura} cm</div>
        <div><strong>Comprimento:</strong> ${objeto.comprimento} cm</div>`
          : ""
      }
      <div><strong>Volume:</strong> ${objeto.volume.toFixed(0)} mm³</div>
    </div>
  `;

  document.querySelector(".sub-pecas-adicionadas").appendChild(divSubPeca);
});


  // Calcula a soma dos volumes
  var somaVolumes = subPecas.reduce(function (total, objeto) {
    return total + objeto.volume;
  }, 0);

  // Exibe a soma dos volumes na página
  var subPecasFinal = document.querySelector('#relatorio-subpecas');
  subPecasFinal.innerHTML = `<span>Volume da peça: </span><input readonly id="volumeDaPeca" class='input-volume' value=${somaVolumes.toFixed(0)}>`;
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
  let volumeDaPeca = document.getElementById("volumeDaPeca")?.value;
  let pesoDoTarugo = document.getElementById("tarugo").value;
  let listaDeMateriais = document.getElementById("listaDeMateriais");
  let valorDaOpcaoSelecionada = listaDeMateriais.value;
  let valorDeCavaco = document.getElementById("");

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

function calcularVolumeDaPeca(volumeDaPeca) {
  const valorVolume = 1.0 * Math.pow(10, -6); // 1.0 × 10^-6 kg
  const resultado = volumeDaPeca * valorVolume;
  return resultado;
}

// Exemplo de uso da função
const volumeDaPeca = 5; // Exemplo de valor para volumeDaPeca, você pode alterar conforme necessário
const resultado = calcularVolumeDaPeca(volumeDaPeca);

// Exibindo o resultado
console.log("Resultado:", resultado);