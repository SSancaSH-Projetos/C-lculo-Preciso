import React, { useState } from 'react';
import { View, Text, CheckBox, TextInput, Button, StyleSheet, ScrollView } from 'react-native';


const App = () => {

  const Stack = createStackNavigator();

  const [opcoes, setOpcoes] = useState({
    cilindrico: false,
  });

  const [inputsVisiveis, setInputsVisiveis] = useState({
    cilindrico: false,
  });

  const mostrarOpcoes = (opcao, value) => {
    const newOpcoes = { ...opcoes, [opcao]: value };
    const newInputsVisiveis = { ...inputsVisiveis, [opcao]: value };
    setOpcoes(newOpcoes);
    setInputsVisiveis(newInputsVisiveis);
  };

  const App = () => {
    const navigation = useNavigation();
    const [nomePeca, setNomePeca] = useState('');
    const [codigoPeca, setCodigoPeca] = useState('');
    
    const handleButtonPress = (type) => {
      if (type === 'botão') {
        navigation.navigate('CalculoP');
      }; 
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Calculadora de Área para Usinagem</Text>

        {/* cilindrico */}
        <Text style={styles.subtitle}>Cálculo de Base Cilindrica</Text>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>cilindrico</Text>
          <CheckBox
            value={opcoes.cilindrico}
            onValueChange={(value) => mostrarOpcoes('cilindrico', value)}
          />
          {inputsVisiveis.cilindrico && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Comprimento"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Largura"
                keyboardType="numeric"
              />
              <Button
                title="Calcular"
                onPress={() => handleButtonPress('botão')}
              />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionTitle: {
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    width: 200,
 
  },
});

export default function AppWrapper() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={CalculoC} />
          <Stack.Screen name="Resultado" component={Resultado} />
          {/* <Stack.Screen name="CalculoC" component={CalculoC} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

