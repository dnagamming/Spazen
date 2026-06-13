import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function PreviewScreen() {
  // 🔥 TEMP MOCK DATA (for demo)
  const salon = {
    name: "Your Salon Name",
    rating: "4.5",
    services: [
      { id: "1", name: "Haircut", price: "299", duration: "30 mins" },
      { id: "2", name: "Facial", price: "599", duration: "60 mins" },
      { id: "3", name: "Beard Trim", price: "199", duration: "20 mins" },
    ],
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Salon Preview",
          headerStyle: { backgroundColor: "#0D0D0D" },
          headerTintColor: "#fff",
        }}
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.content}>

          {/* Salon Info */}
          <Text style={styles.salonName}>{salon.name}</Text>
          <Text style={styles.rating}>⭐ {salon.rating}</Text>

          {/* Section */}
          <Text style={styles.sectionTitle}>Services</Text>

          {/* Services List */}
          <FlatList
            data={salon.services}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View>
                  <Text style={styles.serviceName}>{item.name}</Text>
                  <Text style={styles.meta}>
                    ₹{item.price} • {item.duration}
                  </Text>
                </View>
                <Text style={styles.addBtn}>+ Add</Text>
              </View>
            )}
          />

        </View>
      </SafeAreaView>
    </>
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

  salonName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  rating: {
    color: "#FFD700",
    marginTop: 6,
    marginBottom: 20,
  },

  sectionTitle: {
    color: "#E91E63",
    fontSize: 16,
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#1A1A1A",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  serviceName: {
    color: "#fff",
    fontSize: 15,
  },

  meta: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },

  addBtn: {
    color: "#E91E63",
    fontWeight: "bold",
  },
});