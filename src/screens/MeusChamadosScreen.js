import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import api from "../api/api";

export default function MeusChamados({ route, navigation }) {
  const { token, nome } = route.params || {};
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarChamados = async () => {
    try {
      const res = await api.get("/meus-chamados", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChamados(res.data || []);
    } catch (err) {
      console.error(err.response || err);
      Alert.alert("Erro", "Falha ao carregar chamados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarChamados();
  }, []);

  const renderChamado = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.titulo || "Chamado sem título"}</Text>
      <Text style={styles.cardText}>Status: {item.status || "Desconhecido"}</Text>
      <Text style={styles.cardText}>Data: {item.dataAbertura || "—"}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("AvaliarChamado", {
            token,
            chamadoId: item.id,
            nome,
          })
        }
      >
        <Text style={styles.buttonText}>Avaliar Atendimento</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1D361F" />
        <Text style={styles.loadingText}>Carregando chamados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a), {nome}!</Text>
      <Text style={styles.subtitle}>Seus chamados registrados:</Text>

      {chamados.length === 0 ? (
        <Text style={styles.emptyText}>Você ainda não possui chamados.</Text>
      ) : (
        <FlatList
          data={chamados}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderChamado}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECE5DF",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1D361F",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#859B48",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#DFC8B6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1D361F",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 15,
    color: "#1D361F",
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#1D361F",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ECE5DF",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 16,
    color: "#859B48",
    textAlign: "center",
    marginTop: 40,
  },
  loadingText: {
    marginTop: 10,
    color: "#859B48",
  },
});