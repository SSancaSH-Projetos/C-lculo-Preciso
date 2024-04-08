import React, { useState, useEffect } from 'react';
import { View, Text, CheckBox, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importe o hook useNavigation


const CalculoCScreen = ({navigation}) => {
 // const navigation = useNavigation(); // Obtenha a instância de navegação

  const [opcoes, setOpcoes] = useState({
    cilindro: false,
  });

  const [inputsVisiveis, setInputsVisiveis] = useState({
    cilindro: false,
  });

  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [resultado, setResultado] = useState(null);
  const [historico, setHistorico] = useState([]);

  const mostrarOpcoes = (opcao, value) => {
    const newOpcoes = { ...opcoes, [opcao]: value };
    const newInputsVisiveis = { ...inputsVisiveis, [opcao]: value };
    setOpcoes(newOpcoes);
    setInputsVisiveis(newInputsVisiveis);
  };

  const handleVolume = () => {
    //const navigation = useNavigation();
    // Aqui você pode adicionar a lógica para o que deseja fazer quando o botão é pressionado
    navigation.navigate('calculoVolumeC');
    // console.log('Texto 1:', textInput1);
    // console.log('Texto 2:', textInput2);
  };

  useEffect(() => {
    //carregarHistorico();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Calculao de Área Da Base Usinagem</Text>

        {/* cilindrico */}
        <Text style={styles.subtitle}>Cálculo de Área da Base Cilíndrica</Text>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>Cilindrica</Text>
          <CheckBox
            value={opcoes.cilindro}
            onValueChange={(value) => mostrarOpcoes('cilindro', value)}
          />
          {inputsVisiveis.cilindro && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Raio do Cilindro"
                keyboardType="numeric"
                value={num1}
                onChangeText={setNum1}
              />
              <TextInput
                style={styles.input}
                placeholder="Altura do Cilindro"
                keyboardType="numeric"
                value={num2}
                onChangeText={setNum2}
              />
              <Button
                title="Calcular"
                onPress={handleVolume} // Chama a função calcular ao pressionar o botão
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

export default CalculoCScreen;
