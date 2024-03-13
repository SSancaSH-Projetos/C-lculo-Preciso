import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CalculoP from './assets/src/Telas/calculoP'; // Importando a tela de cálculo prismático
import CalculoC from './assets/src/Telas/calculoC'; // Importando a tela de cálculo cilíndrico
import Resultado from './assets/src/Telas/resultado';

const MainScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Calculadora de Peças de Usinagem</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('CalculoP')}>
            <Text style={styles.buttonText}>Calculo Prismático</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('CalculoC')}>
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
      <Stack.Screen name="Resultado" component={Resultado}/>
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

export default App;
