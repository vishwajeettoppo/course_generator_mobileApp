import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  // console.log('Name : ',userInfo)

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text1}>Hi, {userInfo?.name}</Text>
        <Text style={styles.text2}>Let's Get Started</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text1: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  text2: {
    fontFamily: "outfit",
    fontSize: 15,
  },
});
