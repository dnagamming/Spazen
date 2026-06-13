import { Tabs } from "expo-router";
import {
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#0D0D0D",
          borderTopWidth: 0,
          height: 75,
          paddingTop: 10,
          paddingBottom: 10,
        },

        tabBarActiveTintColor: "#E91E63",
        tabBarInactiveTintColor: "#777",

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 4,
        },
      }}
    >
      {/* 🔥 HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* 🔥 EXPLORE */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",

          tabBarIcon: ({ color }) => (
            <Ionicons
              name="search"
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* 🔥 PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="person"
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}