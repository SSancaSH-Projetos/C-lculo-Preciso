import React, { useState } from 'react';
import { View, Text, CheckBox, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const CalculadoraAreaUsinagem = () => {
  const navigation = useNavigation();

  const [opcoes, setOpcoes] = useState({
    quadrada: false,
    retangular: false,
    triangular: false,
    cilindrica: false,
    prismatica: false,
    
  });

  const [inputsVisiveis, setInputsVisiveis] = useState({
    quadrada: false,
    retangular: false,
    triangular: false,
    cilindrica: false,
    prismatica: false,
  });

  const mostrarOpcoes = (opcao, value) => {
    const newOpcoes = { ...opcoes, [opcao]: value };
    const newInputsVisiveis = { ...inputsVisiveis, [opcao]: value };
    setOpcoes(newOpcoes);
    setInputsVisiveis(newInputsVisiveis);
  };
  
  const handleButtonPress = (type) => {
    navigation.navigate(type === 'botão' ? 'CalculoP' : 'CalculoC', {
      nomePeca,
      codigoPeca
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Calculadora de Área para Usinagem</Text>

        {/* Quadrada */}
        <Text style={styles.subtitle}>Cálculo de Base Quadrada</Text>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>Quadrada</Text>
          <CheckBox
            value={opcoes.quadrada}
            onValueChange={(value) => mostrarOpcoes('quadrada', value)}
          />
          {inputsVisiveis.quadrada && (
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

        {/* Repita o mesmo padrão para as outras checkboxes */}
        {/* Triangular */}
        <Text style={styles.subtitle}>Cálculo de Base Triangular</Text>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>Triangular</Text>
          <CheckBox
            value={opcoes.triangular}
            onValueChange={(value) => mostrarOpcoes('triangular', value)}
          />
          {inputsVisiveis.triangular && (
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
                onPress={() => {
                  // Adicione a lógica de cálculo aqui
                }}
              />
            </View>
          )}
        </View>

        {/* Repita o mesmo padrão para as outras checkboxes */}
        {/* Retangular */}
        <Text style={styles.subtitle}>Cálculo de Base Retangular</Text>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>Retangular</Text>
          <CheckBox
            value={opcoes.retangular}
            onValueChange={(value) => mostrarOpcoes('retangular', value)}
          />
          {inputsVisiveis.retangular && (
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
                onPress={() => {
                  // Adicione a lógica de cálculo aqui
                }}
              />
            </View>
          )}
        </View>

        {/* Repita o mesmo padrão para as outras checkboxes */}

         {/* cilindrica */}
         <Text style={styles.subtitle}>Cálculo de Base cilindrica</Text>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>cilindrica</Text>
          <CheckBox
            value={opcoes.cilindrica}
            onValueChange={(value) => mostrarOpcoes('cilindrica', value)}
          />
          {inputsVisiveis.cilindrica && (
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
                onPress={() => {
                  // Adicione a lógica de cálculo aqui
                }}
              />
            </View>
          )}
        </View>

        {/* Repita o mesmo padrão para as outras checkboxes */}

         {/* prismatica */}
         <Text style={styles.subtitle}>Cálculo de Base prismatica</Text>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>prismatica</Text>
          <CheckBox
            value={opcoes.prismatica}
            onValueChange={(value) => mostrarOpcoes('prismatica', value)}
          />
          {inputsVisiveis.prismatica && (
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
                onPress={() => {
                  // Adicione a lógica de cálculo aqui
                }}
              />
            </View>
          )}
        </View>

        {/* Repita o mesmo padrão para as outras checkboxes */}
        {/* Adicione mais estilos conforme necessário */}
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

export default CalculadoraAreaUsinagem;
