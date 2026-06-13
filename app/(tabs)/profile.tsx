import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useUser } from "../../context/UserContext";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
    const { user, bookings } = useUser();
    const router = useRouter();

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

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* 🔥 HEADER */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>K</Text>
          </View>

          <Text style={styles.name}>
            {user.name}
          </Text>

          <Text style={styles.phone}>
            {user.phone}
          </Text>
        </View>

        {/* 🔥 ACCOUNT OPTIONS */}

        <Pressable style={styles.optionCard}>
          <Text style={styles.optionText}>
            📍 Saved Locations
          </Text>
        </Pressable>

        <Pressable style={styles.optionCard}>
          <Text style={styles.bookingCount}>
            {bookings.length} bookings
          </Text>
        </Pressable>

        <Pressable
            style={styles.optionCard}
            onPress={() => router.push("/my-bookings")}
            >
            <Text style={styles.optionText}>
                📖 My Bookings
            </Text>
        </Pressable>

        <Pressable style={styles.optionCard}>
          <Text style={styles.optionText}>
            💳 Payment Methods
          </Text>
        </Pressable>

        <Pressable style={styles.optionCard}>
          <Text style={styles.optionText}>
            🎧 Help & Support
          </Text>
        </Pressable>

        <Pressable style={styles.logoutBtn}>
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </Pressable>
      </ScrollView>
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

  profileCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 28,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E91E63",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  avatarText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },

  phone: {
    color: "#888",
    marginTop: 4,
  },

  optionCard: {
    backgroundColor: "#1A1A1A",
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
  },

  optionText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },

  logoutBtn: {
    backgroundColor: "#E91E63",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 100,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  bookingCount: {
  color: "#E91E63",
  marginTop: 6,
  fontWeight: "600",
},
});