import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "react-native";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CourseListQuiz({ courseList, option }) {
  const router = useRouter();

  const onPress = (course) => {
    router.push({
      pathname: option.path,
      params: {
        courseParams: JSON.stringify(course),
      },
    });
  };
  return (
    <View>
      <Text>{courseList?.question}</Text>
      <FlatList
        data={courseList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => onPress(item)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 15,
              backgroundColor: Colors.WHITE,
              margin: 10,
              borderRadius: 15,
              elevation: 2,
            }}
          >
            <Image
              source={option?.icon}
              style={{ height: 100, width: "100%", objectFit: "contain" }}
            />
            <Text
              style={{
                fontFamily: "outfit",
                textAlign: "center",
                marginTop: 5,
              }}
              numberOfLines={2}
            >
              {item?.courseTitle}
            </Text>
            <View style={{ position: "absolute", top: 15, right: 15 }}>
              <Ionicons name="checkmark-done-circle" size={24} color="black" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
