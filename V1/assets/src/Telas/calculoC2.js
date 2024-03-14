import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, FlatList } from "react-native";

const CalculadoraVolumePrismatico = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [resultado, setResultado] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [mostrarHistorico, setMostrarHistorico] = useState(false);

  const calcularVolume = async () => {
    try {
      const response = await fetch("http://10.110.12.39:8080/calculos/volumePrismatico", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num1: parseFloat(num1),
          num2: parseFloat(num2),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json();
      setResultado(data.resultado);

      const novaOperacao = {
        id: historico.length + 1,
        operacao: "Volume Prismatico",
        numero1: parseFloat(num1),
        numero2: parseFloat(num2),
        resultado: data.resultado,
      };
      setHistorico([novaOperacao, ...historico]);
    } catch (error) {
      console.error("Erro ao calcular o volume:", error.message);
    }
  };

  const carregarHistorico = async () => {
    try {
      const response = await fetch("http://10.110.12.39:8080/historico/10");
      if (!response.ok) {
        throw new Error("Erro ao carregar o histórico");
      }

      const data = await response.json();
      setHistorico(data);
    } catch (error) {
      console.error("Erro ao carregar o histórico:", error.message);
    }
  };

  useEffect(() => {
    carregarHistorico();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Volume Prismatico</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Número 1"
          onChangeText={(text) => setNum1(text)}
          value={num1}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Número 2"
          onChangeText={(text) => setNum2(text)}
          value={num2}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={calcularVolume}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Resultado: {resultado !== null ? resultado.toFixed(3) : ""}</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.historyButton} onPress={() => setMostrarHistorico(true)}>
          <Text style={styles.historyButtonText}>Histórico</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={mostrarHistorico} animationType="slide">
        <View style={styles.historyModalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setMostrarHistorico(false)}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
          <Text style={styles.historyTitle}>Histórico:</Text>
          <FlatList
            data={historico}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.historyItem}>{`${item.operacao}: ${item.numero1}, ${item.numero2} = ${item.resultado.toFixed(3)}`}</Text>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  resultContainer: {
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
  },
  historyButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  historyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  historyModalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  historyItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CalculadoraVolumePrismatico;
