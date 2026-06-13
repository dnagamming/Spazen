import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import { salons } from "../../data/salon";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SalonDetail() {
  const { name, index } = useLocalSearchParams();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // 🔥 Find salon using ID
  const salon = salons.find((s) => s.id === index);

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  // 🔥 Cart calculations
  const selectedItems =
    salon?.services.filter((s) => selectedServices.includes(s.id)) || [];

  const totalPrice = selectedItems.reduce((sum, s) => sum + s.price, 0);

  // ⚠️ Safety check
  if (!salon) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0D0D0D", padding: 16 }}>
        <Text style={{ color: "white" }}>Salon not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: name as string,
          headerStyle: {
            backgroundColor: "#0D0D0D",
          },
          headerTintColor: "#fff",
        }}
      />

      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <View style={styles.content}>
          
          {/* Subtitle */}
          <Text style={styles.subtitle}>Top rated salon near you</Text>

          {/* Rating */}
          <Text style={styles.rating}>⭐ {salon.rating}</Text>

          {/* Services */}
          <Text style={styles.sectionTitle}>Services</Text>

          {salon.services.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <View>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceMeta}>
                  ₹{service.price} • {service.duration}
                </Text>
              </View>

              <Text
                style={[
                  styles.addBtn,
                  selectedServices.includes(service.id) && styles.addedBtn,
                ]}
                onPress={() => toggleService(service.id)}
              >
                {selectedServices.includes(service.id) ? "Added" : "+ Add"}
              </Text>
            </View>
          ))}
        </View>

        {/* 🔥 CART BAR */}
        {selectedItems.length > 0 && (
          <View style={[styles.cartBar, { bottom: insets.bottom + 10}]}>
            <Text style={styles.cartText}>
              {selectedItems.length} service
              {selectedItems.length > 1 ? "s" : ""} | ₹{totalPrice}
            </Text>

            <Text
                style={styles.proceedBtn}
                onPress={() =>
                    router.push({
                        pathname: "/booking" as any,
                        params: {
                            total: totalPrice.toString(),
                            count: selectedItems.length.toString(),
                        },
                    })
                }
            >
                Proceed
            </Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },
  content: {
    padding: 16,
    paddingBottom: 100, // 🔥 prevents content hiding behind cart
  },
  subtitle: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 10,
  },
  rating: {
    color: "#FFD700",
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#E91E63",
    fontSize: 16,
    marginBottom: 10,
  },
  serviceCard: {
    backgroundColor: "#1A1A1A",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceName: {
    color: "#fff",
    fontSize: 15,
  },
  serviceMeta: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },
  addBtn: {
    color: "#E91E63",
    fontWeight: "bold",
  },
  addedBtn: {
    color: "#4CAF50",
  },

  // 🔥 CART STYLES
  cartBar: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#E91E63",
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartText: {
    color: "#fff",
    fontWeight: "600",
  },
  proceedBtn: {
    color: "#fff",
    fontWeight: "bold",
  },
});