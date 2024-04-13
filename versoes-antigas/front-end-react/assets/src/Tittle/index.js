import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
export { Title };


const Title = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Formulário de Peças</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 600,
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 24, 
    fontStyle: 'normal',
  },
});

export default Title;
