import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Title */}
        <Text style={styles.title}>Owner Dashboard</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Manage your salon and services
        </Text>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Salon</Text>
          <Text style={styles.cardText}>
            No salon added yet
          </Text>

          <Pressable
            style={styles.primaryBtn}
            onPress={() => router.push("/(owner)/add-salon")}
          >
            <Text style={styles.primaryText}>
              + Add Salon
            </Text>
          </Pressable>
        </View>

        {/* Secondary Actions */}
        <View style={styles.actions}>
          <Pressable
            style={styles.secondaryBtn}
            onPress={() => router.push("/(owner)/add-services")}
          >
            <Text style={styles.secondaryText}>
              Add Services
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryBtn}
            onPress={() => router.push("/(owner)/preview")}
          >
            <Text style={styles.secondaryText}>
              Preview Salon
            </Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },

  content: {
    padding: 16,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
  },

  subtitle: {
    color: "#aaa",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  cardText: {
    color: "#aaa",
    marginTop: 6,
    marginBottom: 12,
  },

  primaryBtn: {
    backgroundColor: "#E91E63",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  primaryText: {
    color: "#fff",
    fontWeight: "bold",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  secondaryBtn: {
    backgroundColor: "#1A1A1A",
    padding: 12,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },

  secondaryText: {
    color: "#fff",
  },
});