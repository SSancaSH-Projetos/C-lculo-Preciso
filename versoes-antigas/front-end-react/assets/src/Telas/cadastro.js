import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const CadastroScreen = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Verifica se todos os campos estão preenchidos
  const areFieldsFilled = () => {
    return (
      nome.trim() !== "" &&
      email.trim() !== "" &&
      senha.trim() !== "" &&
      confirmarSenha.trim() !== ""
    );
  };

  // Verifica se as senhas coincidem
  const arePasswordsMatching = () => {
    return senha === confirmarSenha;
  };

  // Atualiza o estado de validade do formulário
  useEffect(() => {
    setIsFormValid(areFieldsFilled() && arePasswordsMatching());
  }, [nome, email, senha, confirmarSenha]);

  const handleCadastro = () => {
    if (!arePasswordsMatching()) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    // Aqui você pode adicionar a lógica para cadastrar os dados
    // Por exemplo, enviar os dados para um servidor
    Alert.alert(
      "Cadastro realizado com sucesso!",
      `Nome: ${nome}\nEmail: ${email}\nSenha: ${senha}`
    );

    // Navegue para a tela principal após o cadastro
    navigation.navigate("Login"); // Substitua 'Login' pelo nome da sua tela de login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça Seu Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={(text) => setNome(text)}
        value={nome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={(text) => setSenha(text)}
        value={senha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry={true}
        onChangeText={(text) => setConfirmarSenha(text)}
        value={confirmarSenha}
      />
      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={handleCadastro}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Cadastro</Text>
      </TouchableOpacity>
    </View>
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
    color: "#fff",
    fontSize: 35,
    marginBottom: 20,
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
});

export default CadastroScreen;
