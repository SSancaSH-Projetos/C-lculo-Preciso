import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  CheckBox,
  StyleSheet,
} from "react-native";

const AreaDaBaseP = ({ navigation }) => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [textInput1, setTextInput1] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    // Verificar se ambos os campos de texto estão preenchidos com números
    if (textInput1.trim() !== "" && !isNaN(textInput1)) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [textInput1]);

  const handleVolume = () => {
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
          navigation.navigate("calculoVolumeP");
        })
        .catch((error) => {
          console.error("Erro ao fazer requisição:", error); // Log de erro
          // Aqui você pode lidar com o erro conforme necessário
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleTitulo}>Calculadora de Área da Base </Text>
      <Text style={styles.title}>Cálculo de Base Quadrada</Text>
      <View style={styles.option}>
        <Text style={styles.optionTitle}>Quadrada</Text>
        <CheckBox value={isChecked1} onValueChange={setIsChecked1} />
        {isChecked1 && (
          <View style={styles.checkBoxContent}>
            <TextInput
              style={styles.textInput}
              placeholder="Digite um número"
              value={textInput1}
              onChangeText={setTextInput1}
              keyboardType="numeric" // Definir o teclado para apenas números
            />
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isButtonEnabled ? "blue" : "gray" },
              ]}
              onPress={handleVolume}
              disabled={!isButtonEnabled} // Desabilitar o botão se isButtonEnabled for false
            >
              <Text style={styles.buttonText}>Pressione-me</Text>
            </TouchableOpacity>
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
              style={styles.textInput}
              placeholder="Digite um número"
              value={textInput1}
              onChangeText={setTextInput1}
              keyboardType="numeric" // Definir o teclado para apenas números
            />
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isButtonEnabled ? "blue" : "gray" },
              ]}
              onPress={handleVolume}
              disabled={!isButtonEnabled} // Desabilitar o botão se isButtonEnabled for false
            >
              <Text style={styles.buttonText}>Pressione-me</Text>
            </TouchableOpacity>
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
              style={styles.textInput}
              placeholder="Digite um número"
              value={textInput1}
              onChangeText={setTextInput1}
              keyboardType="numeric" // Definir o teclado para apenas números
            />
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isButtonEnabled ? "blue" : "gray" },
              ]}
              onPress={handleVolume}
              disabled={!isButtonEnabled} // Desabilitar o botão se isButtonEnabled for false
            >
              <Text style={styles.buttonText}>Pressione-me</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "#11121F",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  titleTitulo: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },

  option: {
    //marginBottom: 10,
    flexDirection: "row", // Alinhar os elementos na horizontal
    alignItems: "center", // Alinhar os elementos verticalmente
    marginLeft: 30,
    paddingHorizontal: 20,
  },
  optionTitle: {
    color: "white",
    marginLeft: -65,
  },
  button: {
    padding: 10,
    backgroundColor: "#404361e4",
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  checkBoxContent: {
    marginTop: 20,
    marginRight: 10,
  },
  checkboxContainer: {
    marginRight: 10, // Adicionar uma margem à direita para separar a checkbox do texto
  },
  textInput: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "white",
    backgroundColor: "#BBBCCE",
  },
});

export default AreaDaBaseP;
