import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Title */}
        <Text style={styles.title}>
          {isSignup ? "Create Account" : "Salon Owner Login"}
        </Text>

        {/* Email */}
        <TextInput
          placeholder="Enter email"
          placeholderTextColor="#666"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <TextInput
          placeholder="Enter password"
          placeholderTextColor="#666"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Button */}
        <Pressable
          style={styles.button}
          onPress={() => router.replace("/(owner)/dashboard")}
        >
          <Text style={styles.buttonText}>
            {isSignup ? "Sign Up" : "Login"}
          </Text>
        </Pressable>

        {/* Toggle */}
        <Pressable onPress={() => setIsSignup(!isSignup)}>
          <Text style={styles.toggleText}>
            {isSignup
              ? "Already have an account? Login"
              : "New here? Create an account"}
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
    justifyContent: "center",
  },

  content: {
    padding: 20,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
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

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  toggleText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
});