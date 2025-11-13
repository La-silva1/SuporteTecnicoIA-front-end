import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

export default function RegistrarScreen({ navigation }) {
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  const handleChange = (campo, valor) => {
    setDados({ ...dados, [campo]: valor });
  };

  const handleCriarConta = async () => {
    console.log("🟢 Botão Criar Conta clicado!");

    const { nome, email, senha } = dados;

    if (!nome || !email || !senha) {
      Alert.alert("Atenção", "Preencha nome, e-mail e senha.");
      return;
    }

    try {
      console.log("📦 Enviando dados para registro:", dados);
      const response = await api.post("/usuarios/register", dados);

      console.log("✅ Resposta do backend:", response.data);
      const token = response.data.token || response.data.Token;

      if (token) {
        await AsyncStorage.setItem("token", token);
        console.log("🔑 Token salvo com sucesso!");

        Alert.alert("Sucesso!", "Conta criada com sucesso.", [
          {
            text: "OK",
            onPress: () =>
              navigation.replace("Novo Chamado", {
                nome: response.data.nome || response.data.Nome || nome,
              }),
          },
        ]);
      } else {
        console.log("❌ Token não encontrado na resposta do backend.");
        Alert.alert(
          "Erro de Autenticação",
          "Registro bem-sucedido, mas não foi possível autenticar. Por favor, tente fazer o login."
        );
        navigation.navigate("Login");
      }
    } catch (err) {
      console.log("❌ Erro no criarConta:", err.response?.data || err.message);
      Alert.alert(
        "Erro no Cadastro",
        err.response?.data?.message ||
          "Não foi possível criar a conta. Verifique os dados e tente novamente."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#859B48"
        value={dados.nome}
        onChangeText={(v) => handleChange("nome", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#859B48"
        value={dados.email}
        onChangeText={(v) => handleChange("email", v)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#859B48"
        secureTextEntry
        value={dados.senha}
        onChangeText={(v) => handleChange("senha", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="#859B48"
        value={dados.telefone}
        onChangeText={(v) => handleChange("telefone", v)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Logradouro"
        placeholderTextColor="#859B48"
        value={dados.logradouro}
        onChangeText={(v) => handleChange("logradouro", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        placeholderTextColor="#859B48"
        value={dados.numero}
        onChangeText={(v) => handleChange("numero", v)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Complemento"
        placeholderTextColor="#859B48"
        value={dados.complemento}
        onChangeText={(v) => handleChange("complemento", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        placeholderTextColor="#859B48"
        value={dados.bairro}
        onChangeText={(v) => handleChange("bairro", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        placeholderTextColor="#859B48"
        value={dados.cidade}
        onChangeText={(v) => handleChange("cidade", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        placeholderTextColor="#859B48"
        value={dados.estado}
        onChangeText={(v) => handleChange("estado", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="CEP"
        placeholderTextColor="#859B48"
        value={dados.cep}
        onChangeText={(v) => handleChange("cep", v)}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleCriarConta}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ECE5DF",
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#1D361F",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#DFC8B6",
    borderRadius: 10,
    padding: 12,
    color: "#1D361F",
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#1D361F",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#ECE5DF",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#859B48",
  },
  backButtonText: {
    color: "#ECE5DF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
