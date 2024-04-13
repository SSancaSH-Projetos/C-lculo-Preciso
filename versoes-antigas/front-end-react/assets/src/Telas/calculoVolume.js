import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  CheckBox,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importe o hook useNavigation

const CalculoCScreen = () => {
  const navigation = useNavigation(); // Obtenha a instância de navegação

  const [opcoes, setOpcoes] = useState({
    quadrada: false,
    retangular: false,
    triangular: false,
    cilindrica: false,
    prismatica: false,
  });

  const [inputsVisiveis, setInputsVisiveis] = useState({
    quadrada: false,
    retangular: false,
    triangular: false,
    cilindro: false,
    prismatica: false,
  });

  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [resultado, setResultado] = useState(null);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    // Verificar se ambos os campos de texto estão preenchidos com números
    if (textInput1.trim() !== "" && !isNaN(textInput1)) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [textInput1]);

  const mostrarOpcoes = (opcao, value) => {
    const newOpcoes = { ...opcoes, [opcao]: value };
    const newInputsVisiveis = { ...inputsVisiveis, [opcao]: value };
    setOpcoes(newOpcoes);
    setInputsVisiveis(newInputsVisiveis);
  };

  const calcular = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/calculos/volumeCilindro",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            num1: parseFloat(num1),
            num2: parseFloat(num2),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json();
      const resultadoCalculado = data.resultado;
      setResultado(resultadoCalculado); // Atualiza o estado com o resultado
      navigation.navigate("Resultado", { resultado: resultadoCalculado }); // Navega para a tela de resultado após o cálculo
    } catch (error) {
      console.error("Erro ao calcular o volume:", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Cálculo Volume Cilíndrico Usinagem</Text>

        {/* cilindrico */}
        <Text style={styles.subtitle}>Cálculo do Volume Cilíndrico</Text>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>Cilindro</Text>
          <CheckBox
            value={opcoes.cilindro}
            onValueChange={(value) => mostrarOpcoes("cilindro", value)}
          />
          {inputsVisiveis.cilindro && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Raio do Cilindro"
                keyboardType="numeric"
                value={num1}
                onChangeText={setNum1}
              />
              <TextInput
                style={styles.input}
                placeholder="Altura do Cilindro"
                keyboardType="numeric"
                value={num2}
                onChangeText={setNum2}
              />
              <Button
                title="Calcular"
                onPress={calcular} // Chama a função calcular ao pressionar o botão
              />
            </View>
          )}
        </View>

        <Text style={styles.title}>Calculadora de Área para Usinagem</Text>

        {/* Quadrada */}
        <Text style={styles.subtitle}>Cálculo de Volume Quadrada</Text>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>Quadrada</Text>
          <CheckBox
            value={opcoes.quadrada}
            onValueChange={(value) => mostrarOpcoes("quadrada", value)}
          />
          {inputsVisiveis.quadrada && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Comprimento"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Largura"
                keyboardType="numeric"
              />
              <Button
                title="Calcular"
                onPress={() => handleButtonPress("Resultado")} // Alteração aqui
              />
            </View>
          )}
        </View>
        {/* Triangular */}
        <Text style={styles.subtitle}>Cálculo de Volume Triangular</Text>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>Triangular</Text>
          <CheckBox
            value={opcoes.triangular}
            onValueChange={(value) => mostrarOpcoes("triangular", value)}
          />
          {inputsVisiveis.triangular && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Comprimento"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Largura"
                keyboardType="numeric"
              />
              <Button
                title="Calcular"
                onPress={() => handleButtonPress("Resultado")}
              />
            </View>
          )}
        </View>

        {/* Retangular */}
        <Text style={styles.subtitle}>Cálculo de Volume Retangular</Text>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>Retangular</Text>
          <CheckBox
            value={opcoes.retangular}
            onValueChange={(value) => mostrarOpcoes("retangular", value)}
          />
          {inputsVisiveis.retangular && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Comprimento"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Largura"
                keyboardType="numeric"
              />
              <Button
                title="Calcular"
                onPress={() => handleButtonPress("Resultado")}
              />
            </View>
          )}
        </View>

        {/* Prismática */}
        <Text style={styles.subtitle}>Cálculo de Volume Prismática</Text>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>Prismática</Text>
          <CheckBox
            value={opcoes.prismatica}
            onValueChange={(value) => mostrarOpcoes("prismatica", value)}
          />
          {inputsVisiveis.prismatica && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Comprimento"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Largura"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Altura"
                keyboardType="numeric"
              />
              <Button
                title="Calcular"
                onPress={() => handleButtonPress("Resultado")}
              />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#11121F", // Cor de fundo do ScrollView
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white", // Cor do título
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white", // Cor do subtítulo
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  optionTitle: {
    marginRight: 10,
    color: "white", // Cor do texto das opções
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    width: 200,
    backgroundColor: "#BBBCCE", // Cor do fundo do input
  },
});

export default CalculoCScreen;
