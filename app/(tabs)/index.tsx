import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import CategoryCard from "../../components/categoryCard";
import ServiceCard from "../../components/serviceCard";
import SalonCard from "../../components/salonCard";

import { categories, services } from "../../data/dummyData";
import { salons } from "../../data/salon";

import { getDistance } from "../../utils/distance";
import useLocation from "../../hooks/useLocation";

export default function HomeScreen() {
  const { location, address, errorMsg } = useLocation();

  const router = useRouter();

  const nearbySalons = location
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
    <SafeAreaView
      style={styles.safeArea}
      edges={["top"]}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {/* 🔥 HEADER */}
        <View style={styles.header}>
          <Text style={styles.locationText}>
            📍 {errorMsg ? "Location unavailable" : address}
          </Text>

          <Pressable
            onPress={() => router.push("/location-picker")}
          >
            <Text style={styles.changeLocation}>
              Change Location
            </Text>
          </Pressable>

          <Text style={styles.heading}>
            Find My Salon
          </Text>
        </View>

        {/* 🔥 BANNER */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Flat 20% OFF on Facial
          </Text>
        </View>

        {/* 🔥 NEARBY */}
        <Text style={styles.sectionTitle}>
          Nearby Salons
        </Text>

        {location ? (
          nearbySalons.length > 0 ? (
            <FlatList
              horizontal
              data={nearbySalons}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                paddingRight: 20,
                paddingBottom: 10,
              }}
              renderItem={({ item }) => {
                const distance = getDistance(
                  location.latitude,
                  location.longitude,
                  item.latitude,
                  item.longitude
                );

                return (
                  <View style={{ marginRight: 14 }}>
                    <SalonCard
                      salon={{ ...item, distance }}
                      onPress={() =>
                        router.push({
                          pathname: "/salon/[index]",
                          params: {
                            index: item.id,
                            name: item.name,
                          },
                        })
                      }
                    />
                  </View>
                );
              }}
            />
          ) : (
            <Text style={styles.infoText}>
              No salons found nearby
            </Text>
          )
        ) : (
          <Text style={styles.infoText}>
            Enable location to see nearby salons
          </Text>
        )}

        {/* 🔥 QUICK ACTIONS */}
        <View style={styles.quickSection}>
          <Pressable style={styles.quickCardLarge}>
            <Text style={styles.quickEmoji}>🔁</Text>

            <Text style={styles.quickTitle}>
              Book Again
            </Text>

            <Text style={styles.quickSubtitle}>
              Rebook your recent services
            </Text>
          </Pressable>

          <View style={styles.quickRow}>
            <Pressable style={styles.quickCardSmall}>
              <Text style={styles.quickEmoji}>🔥</Text>

              <Text style={styles.quickTitle}>
                Offers
              </Text>
            </Pressable>

            <Pressable style={styles.quickCardSmall}>
              <Text style={styles.quickEmoji}>⭐</Text>

              <Text style={styles.quickTitle}>
                Top Rated
              </Text>
            </Pressable>
          </View>
        </View>

        {/* 🔥 CATEGORIES */}
        <Text style={styles.sectionTitle}>
          Salon Services
        </Text>

        <FlatList
          horizontal
          data={categories}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingRight: 20,
          }}
          renderItem={({ item }) => (
            <View style={{ marginRight: 14 }}>
              <CategoryCard item={item} />
            </View>
          )}
        />

        {/* 🔥 OFFER */}
        <View style={styles.offerStrip}>
          <Text style={styles.offerText}>
            ⚡ Limited time: Extra 10% OFF on all services
          </Text>
        </View>

        {/* 🔥 POPULAR */}
        <Text style={styles.sectionTitle}>
          Popular Services
        </Text>

        {services.map((item) => (
          <ServiceCard
            key={item.id}
            item={item}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },

  container: {
    paddingHorizontal: 16,
  },

  header: {
    marginBottom: 24,
  },

  locationText: {
    color: "#AAA",
    fontSize: 14,
  },

  changeLocation: {
    color: "#E91E63",
    fontSize: 13,
    marginTop: 6,
    marginBottom: 14,
    fontWeight: "500",
  },

  heading: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
  },

  banner: {
    backgroundColor: "#E91E63",
    padding: 20,
    borderRadius: 20,
    marginBottom: 26,
  },

  bannerText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "600",
  },

  sectionTitle: {
    color: "#E91E63",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 16,
  },

  infoText: {
    color: "#888",
    marginBottom: 16,
  },

  quickSection: {
    marginTop: 8,
    marginBottom: 28,
  },

  quickRow: {
    flexDirection: "row",
    gap: 12,
  },

  quickCardLarge: {
    backgroundColor: "#1A1A1A",
    padding: 20,
    borderRadius: 18,
    marginBottom: 12,
  },

  quickCardSmall: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    paddingVertical: 24,
    borderRadius: 18,
    alignItems: "center",
  },

  quickEmoji: {
    fontSize: 26,
    marginBottom: 10,
  },

  quickTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  quickSubtitle: {
    color: "#888",
    marginTop: 4,
    fontSize: 13,
  },

  offerStrip: {
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 16,
    marginVertical: 24,
  },

  offerText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
  },
});