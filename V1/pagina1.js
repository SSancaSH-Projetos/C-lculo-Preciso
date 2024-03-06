import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleButtonPress = () => {
    // Aqui você pode adicionar a lógica para lidar com o botão pressionado
    console.log("Input 1:", input1);
    console.log("Input 2:", input2);
  };

  const handleNavigatePagina2 = () => {
    // Navegar para a tela Pagina2.js
    navigation.navigate("Teste");
  };

  return (
    <View style={styles.container}>
      <TextInput
        title="Calculo cilindrico"
        style={styles.input}
        placeholder="Digite o diametro"
        keyboardType="numeric"
        value={input1}
        onChangeText={setInput1}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o segundo valor"
        keyboardType="numeric"
        value={input2}
        onChangeText={setInput2}
      />
      <Button title="Enviar" onPress={handleButtonPress} />
      <Button title="Ir para Pagina 02" onPress={handleNavigatePagina2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
