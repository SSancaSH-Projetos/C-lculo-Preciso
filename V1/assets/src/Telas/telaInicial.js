import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const MainScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = (screen) => {
    navigation.navigate(screen);
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Calculadora de Peças de Usinagem</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('CalculoP')}
          >
            <Text style={styles.buttonText}>Calculo Prismático</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('CalculoC')}
          >
            <Text style={styles.buttonText}>Calculo Cilindrico</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
  buttonContainer: {
    width: '90%',
    maxWidth: 600,
    marginTop: 20,
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

export default MainScreen;
