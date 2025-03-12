import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import CourseProgressCard from "../shared/CourseProgressCard";

export default function CourseProgress({ courseList }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>CourseProgress</Text>
      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <CourseProgressCard item={item} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text1: {
    fontFamily: "outfit-medium",
    fontSize: 25,
    color: Colors.WHITE,
    marginBottom: 10,
  },
});
