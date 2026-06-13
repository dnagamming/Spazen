import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { useRouter, Stack } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LocationPicker() {
  const router = useRouter();

  const [location, setLocation] = useState("");

  // 🔥 SAVE MANUAL LOCATION
  const handleSave = async () => {
    await AsyncStorage.setItem(
      "manualLocation",
      location
    );

    router.back();
  };

  // 🔥 REMOVE MANUAL LOCATION → USE GPS
  const handleUseCurrentLocation = async () => {
    await AsyncStorage.removeItem(
      "manualLocation"
    );

    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#0D0D0D",
          },
          headerTintColor: "#fff",
        }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          Change Location
        </Text>

        <Text style={styles.subtitle}>
          Enter your preferred area or city
        </Text>

        {/* 🔥 GPS BUTTON */}
        <Pressable
          style={styles.currentLocationBtn}
          onPress={handleUseCurrentLocation}
        >
          <Text style={styles.currentLocationText}>
            📍 Use Current Location
          </Text>
        </Pressable>

        {/* 🔥 INPUT */}
        <TextInput
          placeholder="e.g. Koramangala, Bangalore"
          placeholderTextColor="#666"
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />

        {/* 🔥 SAVE */}
        <Pressable
          style={[
            styles.button,
            !location && styles.disabled,
          ]}
          disabled={!location}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>
            Save Location
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
    padding: 20,
    marginTop: 80,
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#aaa",
    marginBottom: 30,
  },

  currentLocationBtn: {
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },

  currentLocationText: {
    color: "#fff",
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#1A1A1A",
    padding: 14,
    borderRadius: 12,
    color: "#fff",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#262626",
  },

  button: {
    backgroundColor: "#E91E63",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  disabled: {
    opacity: 0.5,
  },
});