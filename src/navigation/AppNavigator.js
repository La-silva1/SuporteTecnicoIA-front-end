// src/navigation/AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import AvaliarChamadoScreen from '../screens/AvaliarChamadoScreen';
import LoginScreen from '../screens/LoginScreen';
import MeusChamadosScreen from '../screens/MeusChamadosScreen';
import NovoChamadoScreen from '../screens/NovoChamadoScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AgradecimentoAvaliacaoScreen from '../screens/AgradecimentoAvaliacaoScreen';
import SucessoScreen from '../screens/SucessoScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registrar" component={RegisterScreen} />
      <Stack.Screen name="Meus Chamados" component={MeusChamadosScreen} />
      <Stack.Screen name="Novo Chamado" component={NovoChamadoScreen} />
      <Stack.Screen name="Avaliar Chamado" component={AvaliarChamadoScreen} />
      <Stack.Screen name="Sucesso" component={SucessoScreen} />
      <Stack.Screen name="Agradecimento Avaliacao" component={AgradecimentoAvaliacaoScreen} />
    </Stack.Navigator>
  );
}
