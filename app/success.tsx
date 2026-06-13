import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          
          {/* Emoji / Icon */}
          <Text style={styles.emoji}>🎉</Text>

          {/* Title */}
          <Text style={styles.title}>Booking Confirmed</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Your appointment has been scheduled successfully.
          </Text>
        </View>

        {/* Button */}
        <Pressable
          style={styles.button}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    justifyContent: "space-between",
  },

  content: {
    alignItems: "center",
    marginTop: 120,
    padding: 16,
  },

  emoji: {
    fontSize: 60,
    marginBottom: 20,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#E91E63",
    padding: 16,
    margin: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});