import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ResultadoCalculoUsinagem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.title}>Resultado do Cálculo de Usinagem</Text>
        <View style={styles.result}>
          <Text>
            <Text style={styles.bold}>Peça:</Text> Engrenagem
          </Text>
        </View>
        <View style={styles.result}>
          <Text>
            <Text style={styles.bold}>Material:</Text> Aço Inoxidável
          </Text>
        </View>
        <View style={styles.result}>
          <Text>
            <Text style={styles.bold}>Tipo de Usinagem:</Text> Torneamento
          </Text>
        </View>
        <View style={styles.result}>
          <Text>
            <Text style={styles.bold}>Tempo de Usinagem:</Text> 2 horas
          </Text>
        </View>
        <TouchableOpacity style={styles.historyButton} onPress={() => alert('Ver histórico de cálculos')}>
          <Text style={styles.link}>Ver histórico de cálculos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001F3F',
  },
  resultContainer: {
    maxWidth: 600,
    margin: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1.5,
    shadowRadius: 10,
    padding: 20,
    paddingLeft: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  result: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bold: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  historyButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default ResultadoCalculoUsinagem;
