import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function AddSalon() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Title */}
        <Text style={styles.title}>Add Your Salon</Text>

        {/* Salon Name */}
        <TextInput
          placeholder="Salon Name"
          placeholderTextColor="#666"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        {/* Address */}
        <TextInput
          placeholder="Address"
          placeholderTextColor="#666"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        {/* Rating */}
        <TextInput
          placeholder="Rating (e.g. 4.5)"
          placeholderTextColor="#666"
          style={styles.input}
          value={rating}
          onChangeText={setRating}
          keyboardType="numeric"
        />

        {/* Save Button */}
        <Pressable
          style={[
            styles.button,
            !(name && address) && styles.disabledBtn,
          ]}
          disabled={!(name && address)}
          onPress={() => router.push("/(owner)/add-services")}
        >
          <Text style={styles.buttonText}>
            Save & Add Services
          </Text>
        </Pressable>

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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#1A1A1A",
    padding: 14,
    borderRadius: 12,
    color: "#fff",
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#E91E63",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  disabledBtn: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});