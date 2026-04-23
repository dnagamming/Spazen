import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CategoryCard from "../../components/categoryCard";
import ServiceCard from "../../components/serviceCard";
import { categories, services } from "../../data/dummyData";
import { salons } from "../../data/salon";
import { getDistance } from "../../utils/distance";
import useLocation from "../../hooks/useLocation";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function HomeScreen() {
  const { location, address, errorMsg } = useLocation();
  const router = useRouter();

  const nearbySalons =
    location
      ? salons.filter((salon) => {
          const distance = getDistance(
            location.latitude,
            location.longitude,
            salon.latitude,
            salon.longitude
          );
          return distance <= 5;
        })
      : [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D0D0D" }} edges={["top"]}>
      <ScrollView style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.locationText}>
            📍 {errorMsg ? "Location off" : address}
          </Text>
          <Text style={styles.heading}>Find Your Salon</Text>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Flat 20% OFF on Facial</Text>
        </View>

        {/* 🔥 Nearby Salons */}
        <Text style={styles.sectionTitle}>Nearby Salons</Text>

        {location ? (
          nearbySalons.length > 0 ? (
            nearbySalons.map((salon) => {
              const distance = getDistance(
                location.latitude,
                location.longitude,
                salon.latitude,
                salon.longitude
              );

              return (
                <Pressable
                  key={salon.id}
                  style={styles.serviceCard}
                  onPress={() =>
                    router.push({
                      pathname: "/salon/[index]",
                      params: { index: salon.id, name: salon.name },
                    })
                  }
                >
                  <Text style={styles.serviceTitle}>{salon.name}</Text>
                  <Text style={styles.rating}>⭐ {salon.rating}</Text>
                  <Text style={styles.distance}>
                    {distance.toFixed(1)} km away
                  </Text>
                </Pressable>
              );
            })
          ) : (
            <Text style={styles.infoText}>No salons found nearby</Text>
          )
        ) : (
          <Text style={styles.infoText}>
            Enable location to see nearby salons
          </Text>
        )}

        {/* Quick Actions */}
        <View style={styles.quickRow}>
          <View style={styles.quickCard}>
            <Text style={styles.quickText}>Book Again</Text>
          </View>
          <View style={styles.quickCard}>
            <Text style={styles.quickText}>Offers</Text>
          </View>
          <View style={styles.quickCard}>
            <Text style={styles.quickText}>Top Rated</Text>
          </View>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Salon Services</Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CategoryCard item={item} />}
        />

        {/* Offer Strip */}
        <View style={styles.offerStrip}>
          <Text style={styles.offerText}>
            ⚡ Limited time: Extra 10% OFF on all services
          </Text>
        </View>

        {/* Services */}
        <Text style={styles.sectionTitle}>Popular Services</Text>

        {services.map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  header: {
    marginBottom: 15,
  },

  locationText: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 4,
  },

  heading: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },

  banner: {
    backgroundColor: "#E91E63",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
  },

  bannerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  sectionTitle: {
    color: "#E91E63",
    fontSize: 18,
    marginVertical: 12,
  },

  serviceCard: {
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },

  serviceTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  rating: {
    color: "#FFD700",
    marginTop: 4,
  },

  distance: {
    color: "#aaa",
    marginTop: 4,
  },

  infoText: {
    color: "#aaa",
    marginBottom: 10,
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  quickCard: {
    backgroundColor: "#1A1A1A",
    padding: 12,
    borderRadius: 12,
    width: "30%",
    alignItems: "center",
  },

  quickText: {
    color: "#fff",
    fontSize: 13,
  },

  offerStrip: {
    backgroundColor: "#262626",
    padding: 12,
    borderRadius: 10,
    marginVertical: 15,
  },

  offerText: {
    color: "#fff",
    fontSize: 13,
  },
});