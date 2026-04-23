import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0D0D0D",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#E91E63",
        tabBarInactiveTintColor: "#aaa",
      }}
    />
  );
}