import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";

import CalculoC from "./calculoAreaDaBaseC";
import CalculoP from "./calculoAreaDaBaseP";
import Resultado from "./resultado";
import CalculoAreaDaBase from "./calculoAreaDaBase";
import CalculoVolume from "./calculoVolume";

const MainScreen = ({ navigation }) => {
  const [codigoPeca, setCodigoPeca] = useState("");
  const [nomePeca, setNomePeca] = useState("");
  const [nomeMaterial, setNomeMaterial] = useState("");

  const cadastrarPeca = async () => {
    try {
      if (!codigoPeca || !nomePeca || !nomeMaterial) {
        throw new Error("Por favor, preencha todos os campos.");
      }

      const response = await fetch("http://localhost:8080/api/pecas", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigoPeca,
          nomePeca,
          nomeMaterial,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Erro ao cadastrar peça");
      }

      console.log("Peça cadastrada com sucesso!");
      setCodigoPeca("");
      setNomePeca("");
      setNomeMaterial("");

      Alert.alert("Sucesso", "Peça cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar peça:", error.message);
      Alert.alert("Erro", error.message);
    }
  };

  const handleButtonPress = (screen) => {
    navigation.navigate(screen, {
      nome: nomePeca,
      codigo: codigoPeca,
      material: nomeMaterial,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Calculadora de Peças de Usinagem</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nomePeca}
            onChangeText={setNomePeca}
          />
          <TextInput
            style={styles.input}
            placeholder="Código"
            value={codigoPeca}
            onChangeText={setCodigoPeca}
          />
          <TextInput
            style={styles.input}
            placeholder="Material"
            value={nomeMaterial}
            onChangeText={setNomeMaterial}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={[styles.button, { marginRight: 10 }]}
              onPress={() => {
                cadastrarPeca();
                handleButtonPress("CalculoP");
              }}
            >
              <Text style={styles.buttonText}>Calculo Prismático</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                cadastrarPeca();
                handleButtonPress("calculoAreaDaBase");
              }}
            >
              <Text style={styles.buttonText}>Calculo Cilíndrico</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.buttonContainer, { marginTop: 20 }]}>
          <TouchableOpacity
            style={[styles.button, styles.resultButton]}
            onPress={() => {
              handleButtonPress("Resultado");
            }}
          >
            <Text style={styles.buttonText}>Tela Resultado</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Stack = createStackNavigator();

const TelaInicial = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen
      name="Main"
      component={MainScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CalculoP"
      component={CalculoP}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CalculoC"
      component={CalculoC}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="calculoAreaDaBase"
      component={CalculoAreaDaBase}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Resultado" component={Resultado} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#11121F",
  },
  mainContainer: {
    width: "100%",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  inputContainer: {
    width: "90%",
    marginBottom: 20,
    maxWidth: 600,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#BBBCCE",
  },
  buttonContainer: {
    width: "90%",
    maxWidth: 600,
  },
  button: {
    padding: 10,
    backgroundColor: "#404361e4",
    borderRadius: 5,
    marginVertical: 5,
    flex: 1, // Equal flex to divide space
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  resultButton: {
    marginTop: 0, // Adjust the margin top as needed
  },
});

export default TelaInicial;
