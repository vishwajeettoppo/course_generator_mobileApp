import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { imageAssets } from "../../constants/Options";
import * as Progress from "react-native-progress";

export default function CourseProgress({ courseList }) {
  const GetCompletedChapters = (course) => {
    const completedChapters = course?.completedChapter?.length;
    const per = completedChapters / course?.chapters?.length;
    return per;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>CourseProgress</Text>
      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            style={{
              backgroundColor: Colors.LIGHTGRAY,
              borderRadius: 15,
              gap: 10,
              padding: 5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                gap: 10,
                flexDirection: "row",
                width: 260,
              }}
            >
              <Image
                source={imageAssets[item?.bannerImage]}
                style={{ width: 100, height: 100, borderRadius: 15 }}
              />
              <View style={{ flex: 1, padding: 5 }}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: "outfit-medium",
                    fontSize: 15,
                    flexWrap: "wrap",
                  }}
                >
                  {item?.courseTitle}
                </Text>
                <Text
                  style={{
                    fontFamily: "outfit",
                    fontSize: 14,
                    marginTop: 10,
                    color: Colors.GRAY,
                  }}
                >
                  {item?.chapters?.length} Chapters
                </Text>
              </View>
            </View>
            <View style={{ marginBottom: 4, gap: 5 }}>
              <Progress.Bar progress={GetCompletedChapters(item)} width={250} />
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: 14,
                  color: Colors.GRAY,
                }}
              >
                {item?.completedChapter?.length ?? 0} of{" "}
                {item?.chapters?.length} Chapters Completed
              </Text>
            </View>
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
