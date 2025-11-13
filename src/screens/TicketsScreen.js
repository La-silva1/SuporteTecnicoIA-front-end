// src/screens/TicketsScreen.js
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

export default function TicketsScreen({ route, navigation }) {
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
      Alert.alert("Erro", "Não foi possível carregar seus chamados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarChamados();
  }, []);

  const abrirChamado = () => {
    navigation.navigate("NovoChamado", { token, nome });
  };

  const avaliarChamado = (id) => {
    navigation.navigate("Avaliacao", { token, chamadoId: id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {nome || "usuário"} 👋</Text>
      <Text style={styles.subtitle}>Seus Chamados</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1D361F" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={chamados}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => (
            <View style={styles.ticketCard}>
              <Text style={styles.ticketTitle}>{item.titulo || "Sem título"}</Text>
              <Text style={styles.ticketDesc}>
                {item.descricao || "Sem descrição"}
              </Text>
              <Text style={styles.ticketStatus}>
                Status: {item.status || "Pendente"}
              </Text>

              <TouchableOpacity
                style={styles.evalButton}
                onPress={() => avaliarChamado(item.id)}
              >
                <Text style={styles.evalButtonText}>Avaliar</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Você ainda não possui chamados abertos.
            </Text>
          }
        />
      )}

      <TouchableOpacity style={styles.newButton} onPress={abrirChamado}>
        <Text style={styles.newButtonText}>+ Novo Chamado</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#1D361F",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#859B48",
    marginBottom: 15,
  },
  ticketCard: {
    backgroundColor: "#DFC8B6",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  ticketTitle: {
    fontSize: 18,
    color: "#1D361F",
    fontWeight: "bold",
  },
  ticketDesc: {
    color: "#1D361F",
    marginVertical: 5,
  },
  ticketStatus: {
    color: "#859B48",
    fontWeight: "600",
    marginBottom: 8,
  },
  evalButton: {
    backgroundColor: "#859B48",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  evalButtonText: {
    color: "#ECE5DF",
    fontWeight: "bold",
  },
  newButton: {
    backgroundColor: "#1D361F",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  newButtonText: {
    color: "#ECE5DF",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#1D361F",
    marginTop: 50,
    fontSize: 16,
  },
});
