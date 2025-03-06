import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

export default function Button({ text, type = "fill", onPress, loading, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      style={{
        width: "100%",
        backgroundColor: type === "fill" ? Colors.PRIMARY : Colors.WHITE,
        backgroundColor: disabled ? Colors.LIGHTGRAY : Colors.PRIMARY,
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
        borderWidth: type !== "fill" ? 1 : 0,
        borderColor: Colors.PRIMARY,
      }}
    >
      {!loading ? <Text
        style={{
          textAlign: "center",
          fontFamily: "outfit",
          color: type === "fill" ? Colors.WHITE : Colors.PRIMARY,
          color: disabled ? Colors.GRAY : Colors.WHITE
        }}
      >
        {text}
      </Text>: <ActivityIndicator color={Colors.PRIMARY} />}
    </TouchableOpacity>
  );
}
