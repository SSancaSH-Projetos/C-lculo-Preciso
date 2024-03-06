import React, { useState } from "react";
import { View, Text, TextInput, Button, CheckBox } from "react-native";

const CalculadoraAreaUsinagem = () => {
  const [quadradaChecked, setQuadradaChecked] = useState(false);
  const [retangularChecked, setRetangularChecked] = useState(false);
  const [circularChecked, setCircularChecked] = useState(false);
  const [triangularChecked, setTriangularChecked] = useState(false);

  const [base, setBase] = useState("");
  const [altura, setAltura] = useState("");

  const [opcoesVisiveis, setOpcoesVisiveis] = useState(false);

  const mostrarOpcoesQuadrado = () => {
    setQuadradaChecked(!quadradaChecked);
    setRetangularChecked(false);
    setCircularChecked(false);
    setTriangularChecked(false);
    setOpcoesVisiveis(quadradaChecked);
  };

  const mostrarOpcoesRetangular = () => {
    setRetangularChecked(!retangularChecked);
    setQuadradaChecked(false);
    setCircularChecked(false);
    setTriangularChecked(false);
    setOpcoesVisiveis(retangularChecked);
  };

  const mostrarOpcoesCircular = () => {
    setCircularChecked(!circularChecked);
    setQuadradaChecked(false);
    setRetangularChecked(false);
    setTriangularChecked(false);
    setOpcoesVisiveis(circularChecked);
  };

  const mostrarOpcoesTriangular = () => {
    setTriangularChecked(!triangularChecked);
    setQuadradaChecked(false);
    setRetangularChecked(false);
    setCircularChecked(false);
    setOpcoesVisiveis(triangularChecked);
  };

  const calcularArea = () => {
    // Adicione aqui a lógica para calcular a área com base nos valores inseridos
  };

  return (
    <View>
      <Text>Calculadora de Área para Usinagem</Text>
      <View>
        <CheckBox
          value={quadradaChecked}
          onValueChange={mostrarOpcoesQuadrado}
        />
        <Text>Área da Base Quadrada</Text>
        <CheckBox
          value={retangularChecked}
          onValueChange={mostrarOpcoesRetangular}
        />
        <Text>Área da Base Retangular</Text>
        <CheckBox
          value={circularChecked}
          onValueChange={mostrarOpcoesCircular}
        />
        <Text>Área da Base Circular</Text>
        <CheckBox
          value={triangularChecked}
          onValueChange={mostrarOpcoesTriangular}
        />
        <Text>Área da Base Triangular</Text>
      </View>
      {opcoesVisiveis && quadradaChecked && (
        <View>
          <TextInput
            placeholder="Lado"
            onChangeText={(text) => setBase(text)}
            value={base}
            keyboardType="numeric"
          />
          <Button title="Calcular" onPress={calcularArea} />
        </View>
      )}
      {opcoesVisiveis && retangularChecked && (
        <View>
          <TextInput
            placeholder="Comprimento"
            onChangeText={(text) => setBase(text)}
            value={base}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Largura"
            onChangeText={(text) => setAltura(text)}
            value={altura}
            keyboardType="numeric"
          />
          <Button title="Calcular" onPress={calcularArea} />
        </View>
      )}
      {/* Adicione aqui as outras opções de formas geométricas */}
      <View>
        <Text>Resultado: </Text>
        {/* Exiba o resultado do cálculo aqui */}
      </View>
    </View>
  );
};

export default CalculadoraAreaUsinagem;
