import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function CategoryCard({ item }: any) {
  return (
    <Pressable style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 12,
    width: 130,
  },
  image: {
    width: "100%",
    height: 90,
  },
  name: {
    color: "#fff",
    fontSize: 14,
    paddingHorizontal: 8,
    paddingTop: 6,
  },
  price: {
    color: "#aaa",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});