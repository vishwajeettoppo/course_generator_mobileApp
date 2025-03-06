import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={24} color="black" />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={24} color="black" />
          ),
          tabBarLabel: "Explore",
        }}
      />
      <Tabs.Screen
        name="Progress"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" size={24} color="black" />
          ),
          tabBarLabel: "Progress",
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={24} color="black" />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
