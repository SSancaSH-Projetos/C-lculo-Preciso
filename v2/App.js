import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CalculoP from './assets/src/Telas/calculoP';
import CalculoC from './assets/src/Telas/calculoC';
import Resultado from './assets/src/Telas/resultado';

const MainScreen = () => {
  const navigation = useNavigation();
  const [codigoPeca, setCodigoPeca] = useState("");
  const [nomePeca, setNomePeca] = useState("");
  const [nomeMaterial, setNomeMaterial] = useState("");

  const cadastrarPeca = async () => {
    try {
      // Verificar se os campos estão preenchidos
      if (!codigoPeca || !nomePeca || !nomeMaterial) {
        throw new Error("Por favor, preencha todos os campos.");
      }

      const response = await fetch("http://10.110.12.39:8080/pecas/create", {
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

      const responseData = await response.json(); // Converter a resposta para JSON

      if (!response.ok) {
        throw new Error(responseData.message || "Erro ao cadastrar peça");
      }

      console.log("Peça cadastrada com sucesso!");
      // Limpar os campos após o cadastro
      setCodigoPeca("");
      setNomePeca("");
      setNomeMaterial("");

      // Mostrar mensagem de sucesso
      Alert.alert("Sucesso", "Peça cadastrada com sucesso!");

    } catch (error) {
      console.error("Erro ao cadastrar peça:", error.message);
      // Mostrar mensagem de erro
      Alert.alert("Erro", error.message);
    }
  };

  const handleButtonPress = (screen) => {
    navigation.navigate(screen, { nome: nomePeca, codigo: codigoPeca, material: nomeMaterial }); // Passando os valores como props
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              cadastrarPeca(); // Chama a função para cadastrar a peça
              handleButtonPress('CalculoP'); // Navega para a próxima tela
            }}>
            <Text style={styles.buttonText}>Calculo Prismático</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              cadastrarPeca(); // Chama a função para cadastrar a peça
              handleButtonPress('CalculoC'); // Navega para a próxima tela
            }}>
            <Text style={styles.buttonText}>Calculo Cilíndrico</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CalculoP" component={CalculoP} />
      <Stack.Screen name="CalculoC" component={CalculoC} />
      <Stack.Screen name="Resultado" component={Resultado} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  mainContainer: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
    maxWidth: 600,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    width: '90%',
    maxWidth: 600,
  },
  button: {
    padding: 10,
    backgroundColor: '#404361e4',
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default App;
