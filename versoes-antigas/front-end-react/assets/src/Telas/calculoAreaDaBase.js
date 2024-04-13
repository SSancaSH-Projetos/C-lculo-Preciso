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
import CalculoVolume from "./calculoVolume";
import TelaInicial from "./telaInicial";

const CalculoCScreen = () => {
  const navigation = useNavigation(); // Obtenha a instância de navegação

  const [opcoes, setOpcoes] = useState({
    cilindro: false,
  });

  const [inputsVisiveis, setInputsVisiveis] = useState({
    cilindro: false,
  });

  useEffect(() => {
    // Verificar se ambos os campos de texto estão preenchidos com números
    if (textInput1.trim() !== "" && !isNaN(textInput1)) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [textInput1]);

  useEffect(() => {
    //carregarHistorico();
  }, []);

  const handleVolume = ({ navigation }) => {
    // Verifica se o campo de texto está preenchido
    if (textInput1.trim() !== "") {
      // Faz a requisição para o endpoint
      fetch("http://localhost:8080/calculos/AreaBaseQuadrada", {
        method: "POST", // Método HTTP
        headers: {
          "Content-Type": "application/json", // Tipo de conteúdo da requisição
        },
        body: JSON.stringify({
          // Corpo da requisição, no formato JSON
          num1: parseFloat(textInput1), // Converte o texto para número
          
        }),
      })
        .then((response) => response.json()) // Converte a resposta para JSON
        .then((data) => {
          console.log("Resposta do servidor:", data); // Log da resposta do servidor
          // Aqui você pode lidar com a resposta do servidor conforme necessário
          navigation.navigate("Resultado");
        })
        .catch((error) => {
          console.error("Erro ao fazer requisição:", error); // Log de erro
          // Aqui você pode lidar com o erro conforme necessário
        });
    }
  };

  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [textInput1, setTextInput1] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [historico, setHistorico] = useState([]);

  const mostrarOpcoes = (opcao, value) => {
    const newOpcoes = { ...opcoes, [opcao]: value };
    const newInputsVisiveis = { ...inputsVisiveis, [opcao]: value };
    setOpcoes(newOpcoes);
    setInputsVisiveis(newInputsVisiveis);
  };

  //   const handleButtonPress = () => {
  //     // Aqui você pode adicionar a lógica para o que deseja fazer quando o botão é pressionado
  //     navigation.navigate("CalculoVolume");
  //   };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Cálculo de Área Da Base Usinagem</Text>

        {/* cilindrico */}
        <Text style={styles.subtitle}>Cálculo de Área da Base Cilíndrica</Text>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>Cilíndrica</Text>
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
                onPress={handleVolume} // Chama a função calcular ao pressionar o botão
              />
            </View>
          )}
        </View>
        <Text style={styles.titleTitulo}>Calculadora de Área da Base </Text>
        <Text style={styles.title}>Cálculo de Base Quadrada</Text>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>Quadrada</Text>
          <CheckBox value={isChecked1} onValueChange={setIsChecked1} />
          {isChecked1 && (
            <View style={styles.checkBoxContent}>
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
                onPress={handleVolume} // Chama a função calcular ao pressionar o botão
              />
            </View>
          )}
        </View>

        <Text style={styles.title}>Cálculo de Base Retangular</Text>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>Retangular</Text>
          <CheckBox value={isChecked2} onValueChange={setIsChecked2} />
          {isChecked2 && (
            <View style={styles.checkBoxContent}>
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
                onPress={handleVolume} // Chama a função calcular ao pressionar o botão
              />
            </View>
          )}
        </View>

        <Text style={styles.title}>Cálculo de Base Triangular</Text>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>Triangular</Text>
          <View style={styles.checkboxContainer}></View>
          <CheckBox value={isChecked3} onValueChange={setIsChecked3} />
          {isChecked3 && (
            <View style={styles.checkBoxContent}>
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
                onPress={handleVolume} // Chama a função calcular ao pressionar o botão
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

  checkBoxContent: {
    marginTop: 20,
    marginRight: 10,
  },
  checkboxContainer: {
    marginRight: 10, // Adicionar uma margem à direita para separar a checkbox do texto
  },
});

export default CalculoCScreen;
