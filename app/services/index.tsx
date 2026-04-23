import { View, Text, StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";

const servicesData = [
  { id: "1", name: "Basic Haircut", price: "₹299", duration: "30 mins", category: "Haircut" },
  { id: "2", name: "Advanced Haircut", price: "₹499", duration: "45 mins", category: "Haircut" },
  { id: "3", name: "Glow Facial", price: "₹799", duration: "60 mins", category: "Facial" },
];

export default function ServicesScreen() {
  const { category } = useLocalSearchParams();

  const filteredServices = servicesData.filter(
    (item) => item.category === category
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{category} Services</Text>

      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>
              {item.price} • {item.duration}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 16,
  },
  heading: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  subtitle: {
    color: "#aaa",
    marginTop: 4,
  },
});