import { useEffect } from "react"; // Import useEffect
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Sucesso({ route, navigation }) {
  const { resposta } = route.params || {};

  const displayMessage =
    resposta && resposta.ticket && resposta.ticket.respostaIA
      ? resposta.ticket.respostaIA
      : "Seu chamado foi aberto e processado com sucesso.";

  const ticketId = resposta?.ticket?.id;

  // Configura o botão de cabeçalho dinamicamente
  useEffect(() => {
    if (ticketId) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("Avaliar Chamado", { ticketId })}
          >
            <Text style={styles.headerButtonText}>Avaliar</Text>
          </TouchableOpacity>
        ),
      });
    } else {
      // Limpa o botão do cabeçalho se não houver ticketId
      navigation.setOptions({ headerRight: undefined });
    }
  }, [navigation, ticketId]); // Dependências do useEffect

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.emoji}>🤖</Text>
      <Text style={styles.title}>Resposta da IA</Text>
      <Text style={styles.subtitle}>{displayMessage}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Meus Chamados")}
      >
        <Text style={styles.buttonText}>Ver Meus Chamados</Text>
      </TouchableOpacity>

      {/* O botão de avaliação foi movido para o cabeçalho */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECE5DF",
  },
  scrollContent: {
    alignItems: "center",
    padding: 20,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D361F",
    textAlign: "center",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "left",
    marginBottom: 40,
    paddingHorizontal: 10,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#1D361F",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 15,
    width: "90%",
  },
  buttonText: {
    color: "#ECE5DF",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Novos estilos para o botão do cabeçalho
  headerButton: {
    marginRight: 15,
    backgroundColor: "#859B48",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  headerButtonText: {
    color: "#ECE5DF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
