import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { imageAssets } from "../../constants/Options";
import * as Progress from "react-native-progress";

export default function CourseProgressCard({ item, width = 260 }) {
  const GetCompletedChapters = (course) => {
    const completedChapters = course?.completedChapter?.length;
    const per = completedChapters / course?.chapters?.length;
    return per;
  };
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        gap: 10,
        padding: 5,
        display: "flex",
        alignItems: "center",
        width: width,
        margin: 4,
        elevation: 2,
      }}
    >
      <View
        style={{
          display: "flex",
          gap: 10,
          flexDirection: "row",
        }}
      >
        <Image
          source={imageAssets[item?.bannerImage]}
          style={{ width: 100, height: 100, borderRadius: 15 }}
        />
        <View style={{ flex: 1, padding: 5 }}>
          <Text
            numberOfLines={3}
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
      <View style={{ marginBottom: 4, gap: 5, width: "95%" }}>
        <Progress.Bar
          progress={GetCompletedChapters(item)}
          width={width - 20}
        />
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            color: Colors.GRAY,
          }}
        >
          {item?.completedChapter?.length ?? 0} of {item?.chapters?.length}{" "}
          Chapters Completed
        </Text>
      </View>
    </View>
  );
}
