// src/screens/NovoChamado.js
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { abrirChamado } from "../api/api";

export default function NovoChamado({ navigation }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleEnviarChamado = async () => {
    if (!titulo || !descricao || !categoria) {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    try {
      // Usa a função da API, que já trata a autenticação
      const resposta = await abrirChamado({ titulo, descricao, categoria });

      // Navega para a tela de sucesso com a resposta da IA
      navigation.navigate("Sucesso", { resposta });
    } catch (err) {
      console.error(err.response || err);
      Alert.alert("Erro", err.response?.data?.message || "Falha ao enviar chamado.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Novo Chamado</Text>
      <Text style={styles.subtitle}>Preencha os detalhes abaixo:</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ex: Problema no sistema"
        placeholderTextColor="#859B48"
      />

      <Text style={styles.label}>Categoria</Text>
      <TextInput
        style={styles.input}
        value={categoria}
        onChangeText={setCategoria}
        placeholder="Ex: Suporte Técnico"
        placeholderTextColor="#859B48"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descreva o problema com detalhes"
        placeholderTextColor="#859B48"
        multiline
        numberOfLines={5}
      />

      <TouchableOpacity style={styles.button} onPress={handleEnviarChamado}>
        <Text style={styles.buttonText}>Enviar Chamado</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => navigation.navigate("Meus Chamados")}
      >
        <Text style={styles.backButtonText}>Ver Meus Chamados</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ECE5DF",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D361F",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#859B48",
    textAlign: "center",
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    color: "#1D361F",
    marginBottom: 6,
    marginTop: 10,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#DFC8B6",
    borderRadius: 10,
    padding: 12,
    color: "#1D361F",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#1D361F",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 25,
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