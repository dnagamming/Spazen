import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";

export default function SalonCard({ salon, onPress }: any) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      
      {/* Image */}
      <View>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
          }}
          style={styles.image}
        />

        {/* 🔥 Rating Badge */}
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {salon.rating}</Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {salon.name}
        </Text>

        {salon.distance && (
          <Text style={styles.distance}>
            {salon.distance.toFixed(1)} km away
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
  width: 240,
  backgroundColor: "#1A1A1A",
  borderRadius: 18,
  overflow: "hidden",
},

content: {
  padding: 14,
},

  image: {
    width: "100%",
    height: 160,
  },

  // 🔥 Floating rating badge
  ratingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#000",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  ratingText: {
    color: "#FFD700",
    fontSize: 12,
    fontWeight: "600",
  },

  info: {
    padding: 10,
  },

  name: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  distance: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 4,
  },
});