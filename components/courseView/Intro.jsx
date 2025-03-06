import { View, Text, Image } from "react-native";
import React from "react";
import { imageAssets } from "../../constants/Options";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Button from "../shared/Button";
import Chapters from "./Chapters";

export default function Intro({ course }) {
  return (
    <View>
      <Image
        source={imageAssets[course?.bannerImage]}
        style={{ width: "100%", height: 250 }}
      />
      <View style={{ padding: 25 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
          {course?.courseTitle}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Ionicons name="book-outline" size={20} color={Colors.GRAY} />
          <Text style={{ fontSize: 16, fontFamily: "outfit" }}>
            {course?.chapters?.length} Chapters
          </Text>
        </View>
        <Text
          style={{ fontSize: 20, fontFamily: "outfit-medium", marginTop: 20 }}
        >
          Description:
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "outfit",
            marginTop: 5,
            color: Colors.GRAY,
          }}
        >
          {course?.description}
        </Text>
        <Button text={"Start Now"} />
        <Chapters course={course} />
      </View>
    </View>
  );
}
