import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function AddServices() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const [services, setServices] = useState<any[]>([]);

  const addService = () => {
    if (!name || !price || !duration) return;

    const newService = {
      id: Date.now().toString(),
      name,
      price,
      duration,
    };

    setServices([...services, newService]);

    // reset fields
    setName("");
    setPrice("");
    setDuration("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Title */}
        <Text style={styles.title}>Add Services</Text>

        {/* Inputs */}
        <TextInput
          placeholder="Service Name"
          placeholderTextColor="#666"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Price (₹)"
          placeholderTextColor="#666"
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Duration (e.g. 60 mins)"
          placeholderTextColor="#666"
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
        />

        {/* Add Button */}
        <Pressable
          style={[
            styles.addBtn,
            !(name && price && duration) && styles.disabledBtn,
          ]}
          disabled={!(name && price && duration)}
          onPress={addService}
        >
          <Text style={styles.addText}>+ Add Service</Text>
        </Pressable>

        {/* Service List */}
        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <View style={styles.serviceCard}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.serviceMeta}>
                ₹{item.price} • {item.duration}
              </Text>
            </View>
          )}
        />

      </View>

      {/* Next Button */}
      <Pressable
        style={[
          styles.nextBtn,
          services.length === 0 && styles.disabledBtn,
        ]}
        disabled={services.length === 0}
        onPress={() => router.push("/(owner)/preview")}
      >
        <Text style={styles.nextText}>Continue to Preview</Text>
      </Pressable>

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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#1A1A1A",
    padding: 14,
    borderRadius: 12,
    color: "#fff",
    marginBottom: 12,
  },

  addBtn: {
    backgroundColor: "#E91E63",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },

  addText: {
    color: "#fff",
    fontWeight: "bold",
  },

  serviceCard: {
    backgroundColor: "#1A1A1A",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  serviceName: {
    color: "#fff",
    fontSize: 15,
  },

  serviceMeta: {
    color: "#aaa",
    marginTop: 4,
  },

  nextBtn: {
    backgroundColor: "#E91E63",
    padding: 16,
    margin: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  nextText: {
    color: "#fff",
    fontWeight: "bold",
  },

  disabledBtn: {
    opacity: 0.5,
  },
});