import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import de outras telas
import TelaInicial from "./assets/src/Telas/telaInicial";
import Cadastro from "./assets/src/Telas/cadastro";
import CalculoVolumeP from "./assets/src/Telas/calculoVolumeP";
import CalculoVolumeC from "./assets/src/Telas/calculoVolumeC";
import Resultado from "./assets/src/Telas/resultado";
import CalculoVolume from "./assets/src/Telas/calculoVolume";

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  

  const areFieldsFilled = () => {
    return username.trim() !== "" && password.trim() !== "";
  };

  const handleLogin = () => {
    if (areFieldsFilled()) {
      console.log("Usuário:", username);
      console.log("Senha:", password);
      navigation.navigate("telaInicial"); // Navegar para testeLogin ao fazer login
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const handleCadastro = () => {
    navigation.navigate("cadastro"); // Navegar para a tela inicial
  };

  const buttonStyles = areFieldsFilled()
    ? styles.button
    : [styles.button, styles.buttonDisabled];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={buttonStyles} // Aplicando estilos condicionais
        onPress={handleLogin}
        disabled={!areFieldsFilled()} // Desativar o botão se os campos não estiverem preenchidos
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {/* Novo botão */}
      <TouchableOpacity style={styles.newButton} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Remover NavBar da tela de login
        />
        <Stack.Screen
          name="cadastro"
          component={Cadastro}
          options={{ headerShown: false }}
        />
        {/* Adicionando a tela inicial ao Stack Navigator */}
        <Stack.Screen
          name="telaInicial"
          component={TelaInicial}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="app"
          component={App}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="calculoVolumeP"
          component={CalculoVolumeP}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="calculoVolumeC"
          component={CalculoVolumeC}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Resultado"
          component={Resultado}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="calculoVolume"
          component={CalculoVolume}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#11121F",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#BBBCCE",
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#404361e4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: "#ccc", // Cor de fundo para o botão desativado
  },
  newButton: {
    width: "80%",
    height: 40,
    backgroundColor: "#404361e4", // Cor do novo botão
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default App;
