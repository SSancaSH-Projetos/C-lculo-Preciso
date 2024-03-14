import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';

const ResultadoCalculoUsinagem = ({ route }) => {
  const [mostrarHistorico, setMostrarHistorico] = useState(false); // Variável para controlar a exibição do histórico
  const [historico, setHistorico] = useState([]); // Variável para armazenar os dados do histórico
  const { resultado } = route.params;

  const { nome, codigo, material } = resultado;

  const carregarHistorico = async () => {
    try {
      const response = await fetch("http://10.110.12.39:8080/calculos/historico");
      if (!response.ok) {
        throw new Error("Erro ao carregar o histórico");
      }

      const data = await response.json();
      setHistorico(data);
    } catch (error) {
      console.error("Erro ao carregar o histórico:", error.message);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.resultContainer}>
        <Text style={styles.title}>Resultado do Cálculo de Usinagem</Text>
       
        <View style={styles.result}>
        <View >
        {/* Exibindo o resultado */}
        
        <Text> <Text style={styles.bold}>Nome: </Text><Text>{nome}</Text></Text>
      </View>
        </View>
        <View style={styles.result}>
          <Text>
          <Text> <Text style={styles.bold}>Código: </Text><Text>{codigo}</Text></Text>
          </Text>
        </View>
        <View style={styles.result}>
          <Text>
          <Text> <Text style={styles.bold}>Material: </Text><Text>{material}</Text></Text>
          </Text>
        </View>
        <View style={styles.result}>
          <Text>
          <Text> <Text style={styles.bold}>Resultado: </Text><Text>{resultado}</Text></Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.historyButton} onPress={() => { setMostrarHistorico(true); carregarHistorico(); }}>
          <Text style={styles.link}>Ver histórico de cálculos</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={mostrarHistorico} animationType="slide">
        <View style={styles.historyModalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setMostrarHistorico(false)}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
          <Text style={styles.historyTitle}>Histórico:</Text>
          <FlatList
            data={historico}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.historyItem}>{`${item.operacao}: ${item.numero1}, ${item.numero2} = ${item.resultado.toFixed(3)}`}</Text>
            )}
          />
        </View>
      </Modal>
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
  historyModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#007bff',
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ResultadoCalculoUsinagem;
