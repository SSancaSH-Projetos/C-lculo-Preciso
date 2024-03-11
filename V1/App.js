import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Title from './assets/src/Tittle/index.js';
import CalculoP from "./calculoP";
import CalculoC from "./calculoC.js";

const App = () => {
  const navigation = useNavigation();
  const [nomePeca, setNomePeca] = useState('');
  const [codigoPeca, setCodigoPeca] = useState('');
  
  const handleButtonPress = (type) => {
    if (type === 'botão') {
      navigation.navigate('CalculoP');
    } 
    else if (type === 'cilindrico') {
      navigation.navigate('CalculoC');
    }

    
  }
   

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
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('botão')}
          >
            <Text style={styles.buttonText}>Calculo Prismático</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('cilindrico')}
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
    backgroundColor: '#eeeeee'
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

const Stack = createStackNavigator();

export default function AppWrapper() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="CalculoP" component={CalculoP} />
        <Stack.Screen name="CalculoC" component={CalculoC} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
