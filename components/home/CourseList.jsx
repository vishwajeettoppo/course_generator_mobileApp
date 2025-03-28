import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { imageAssets } from "../../constants/Options";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function CourseList({
  courseList,
  heading = "Your Courses",
  enroll = false,
}) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>{heading}</Text>
      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              router.push({
                pathname: "/courseView/" + item?.docId,
                params: {
                  courseParams: JSON.stringify(item),
                  enroll: enroll,
                },
              })
            }
            style={styles.courseContainer}
          >
            <Image
              source={imageAssets[item.bannerImage]}
              style={styles.courseImage}
            />
            <Text style={styles.courseTitle}>{item?.courseTitle}</Text>
            <View style={styles.chapters}>
              <Ionicons name="book-outline" size={20} color={Colors.GRAY} />
              <Text style={styles.text2}>
                {item?.chapters?.length} Chapters
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 50,
  },
  text1: {
    fontFamily: "outfit-medium",
    fontSize: 25,
    color: Colors.PRIMARY,
    // marginBottom: 10,
  },
  courseContainer: {
    margin: 4,
    backgroundColor: Colors.WHITE,
    // borderWidth: 0.1,
    elevation: 2,
    padding: 5,
    width: 260,
    borderRadius: 15,
  },
  courseImage: {
    height: 150,
    width: 250,
    borderRadius: 12,
  },
  courseTitle: {
    fontSize: 15,
    fontFamily: "outfit-medium",
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 5,
  },
  text2: {
    fontSize: 14,
    fontFamily: "outfit",
    color: Colors.GRAY,
  },
  chapters: {
    display: "flex",
    paddingHorizontal: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
