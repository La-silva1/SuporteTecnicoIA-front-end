// src/screens/LoginScreen.js
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }

    try {
      const res = await api.post("/entrar", { email, senha });
      const auth = res.data;

      const token = auth.token || auth.Token;
      if (token) {
        await AsyncStorage.setItem("token", token);
      }

      navigation.replace("Novo Chamado", {
        token: token,
        nome: auth.nome || auth.Nome,
      });
    } catch (err) {
      console.error(err.response || err);
      Alert.alert("Erro ao entrar", err.response?.data?.message || "E-mail ou senha inválidos.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>ConnectWay</Text>

        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#555"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#555"
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Registrar")}>
          <Text style={styles.linkText}>Criar uma conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFC8B6",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#ECE5DF",
    borderRadius: 16,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    color: "#1D361F",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#C4C7B6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#1D361F",
  },
  button: {
    backgroundColor: "#859B48",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#ECE5DF",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    textAlign: "center",
    color: "#1D361F",
    fontSize: 16,
    marginTop: 8,
  },
});
