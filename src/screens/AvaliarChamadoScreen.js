import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { avaliarChamado } from "../api/api";

// Componente para renderizar uma estrela
const Star = ({ filled, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={filled ? styles.starFilled : styles.starEmpty}>★</Text>
  </TouchableOpacity>
);

export default function AvaliarChamadoScreen({ route, navigation }) {
  // Recebe o ID do ticket da tela anterior
  const { ticketId } = route.params || {};
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");

  const handleAvaliar = async () => {
    if (!ticketId) {
      Alert.alert("Erro", "ID do chamado não encontrado.");
      return;
    }
    if (nota === 0) {
      Alert.alert("Atenção", "Por favor, selecione uma nota de 1 a 5.");
      return;
    }

    try {
      // Usa a função da API, que já lida com a autenticação
      await avaliarChamado(ticketId, { nota, comentario });

      // Navega para a nova tela de agradecimento pela avaliação
      navigation.navigate("Agradecimento Avaliacao");
    } catch (err) {
      console.error(err.response || err);
      Alert.alert(
        "Erro",
        err.response?.data?.message || "Falha ao registrar avaliação."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Avaliação do Chamado</Text>
      <Text style={styles.subtitle}>Como foi seu atendimento?</Text>

      <Text style={styles.label}>Nota</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} filled={i <= nota} onPress={() => setNota(i)} />
        ))}
      </View>

      <Text style={styles.label}>Comentário</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={comentario}
        onChangeText={setComentario}
        placeholder="Deixe seu comentário (opcional)"
        placeholderTextColor="#859B48"
        multiline
        numberOfLines={5}
      />

      <TouchableOpacity style={styles.button} onPress={handleAvaliar}>
        <Text style={styles.buttonText}>Enviar Avaliação</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Cancelar</Text>
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
    marginBottom: 10,
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
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  starEmpty: {
    fontSize: 40,
    color: "#DFC8B6",
    marginHorizontal: 5,
  },
  starFilled: {
    fontSize: 40,
    color: "#FFC107",
    marginHorizontal: 5,
  },
});
