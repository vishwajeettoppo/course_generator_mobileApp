import { View, Text, Pressable } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function AddCourseButton() {
  const router = useRouter();
  return (
    <View
      style={{
        backgroundColor: Colors.PRIMARY,
        width: 60,
        height: 60,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: 20,
        bottom: 20,
      }}
    >
      <Pressable onPress={() => router.push("/addCourse")}>
        <Ionicons name="add" size={50} color="white" />
      </Pressable>
    </View>
  );
}
