import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Title from './assets/src/Tittle/index.js';

const App = () => {
  const [nomePeca, setNomePeca] = useState('');
  const [codigoPeca, setCodigoPeca] = useState('');

  const handleButtonPress = (type) => {
    // Implement your logic based on the button type (Aço or Alumínio)
    // Example: navigation.navigate(type === 'aco' ? 'TelaCalculoP' : 'TelaCalculoC');
  };

  return (
    <View style={styles.container}>
      <Title />

      <View style={styles.mainContainer}>
        <Text style={styles.header}>Calculadora de Peças de Usinagem</Text>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome da Peça e Código:</Text>
            <TextInput
              style={styles.input}
              value={nomePeca}
              onChangeText={(text) => setNomePeca(text)}
              placeholder="Exemplo nomeDaPeça#0000"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Material:</Text>
            <TextInput
              style={styles.input}
              value={codigoPeca}
              onChangeText={(text) => setCodigoPeca(text)}
              placeholder="Digite o material da peça"
            />
          </View>

          {/* Checkbox group and buttons go here */}
          {/* Use the same onPress handler for both buttons */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('aco')}
          >
            <Text style={styles.buttonText}>Calculo Prismático</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('aluminio')}
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
  form: {
    width: '90%',
    maxWidth: 600,
    backgroundColor: '#404361aa',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
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