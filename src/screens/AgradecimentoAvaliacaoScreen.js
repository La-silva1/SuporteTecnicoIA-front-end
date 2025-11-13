import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AgradecimentoAvaliacaoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>✅</Text>
      <Text style={styles.title}>Obrigado pela sua avaliação!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Novo Chamado")}
      >
        <Text style={styles.buttonText}>Abrir Novo Chamado</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECE5DF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D361F",
    textAlign: "center",
    marginBottom: 30,
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
  logoutButton: {
    backgroundColor: "#859B48",
  },
  logoutButtonText: {
    color: "#ECE5DF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
