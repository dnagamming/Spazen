import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Stack } from "expo-router";

import { useUser } from "../context/UserContext";

export default function MyBookings() {
  const { bookings } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "My Bookings",
          headerStyle: {
            backgroundColor: "#0D0D0D",
          },
          headerTintColor: "#fff",
        }}
      />

      <View style={styles.content}>
        {bookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No bookings yet
            </Text>
          </View>
        ) : (
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View>
                  <Text style={styles.salonName}>
                    {item.salonName}
                  </Text>

                  <Text style={styles.service}>
                    {item.serviceName}
                  </Text>

                  <Text style={styles.meta}>
                    {item.date} • {item.time}
                  </Text>
                </View>

                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>
                    Confirmed
                  </Text>
                </View>
              </View>
            )}
          />
        )}
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
    flex: 1,
    padding: 16,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "#777",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  salonName: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  service: {
    color: "#E91E63",
    marginTop: 4,
    fontSize: 14,
  },

  meta: {
    color: "#888",
    marginTop: 6,
    fontSize: 13,
  },

  statusBadge: {
    backgroundColor: "#E91E6320",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },

  statusText: {
    color: "#E91E63",
    fontWeight: "600",
    fontSize: 12,
  },
});