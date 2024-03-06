import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Teste2 from "./pagina02";
import Teste from "./calculoP";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Teste2">
        <Stack.Screen name="Calculos disponiveis" component={Teste2} />
        <Stack.Screen name="Teste" component={Teste} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
