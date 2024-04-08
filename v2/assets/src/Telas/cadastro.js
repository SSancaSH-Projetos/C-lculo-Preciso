import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importe useNavigation

const CadastroScreen = ({ navigation }) => {
  //const navigation = useNavigation(); // Obtenha o objeto de navegação

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // Aqui você pode adicionar a lógica para cadastrar os dados
    // Por exemplo, enviar os dados para um servidor
    Alert.alert('Cadastro realizado com sucesso!', `Nome: ${nome}\nEmail: ${email}\nSenha: ${senha}`);

    // Navegue para a tela principal após o cadastro
    navigation.navigate('Login'); // Substitua 'App' pelo nome da sua tela principal
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
        placeholder="Nome"
        onChangeText={text => setNome(text)}
        value={nome}
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
        placeholder="E-mail"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={text => setSenha(text)}
        value={senha}
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
        placeholder="Confirmar Senha"
        secureTextEntry={true}
        onChangeText={text => setConfirmarSenha(text)}
        value={confirmarSenha}
      />
      <Button
        title="Cadastro"
        onPress={handleCadastro}
      />
    </View>
  );
};

export default CadastroScreen;
