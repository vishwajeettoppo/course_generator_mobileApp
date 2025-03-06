import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function Chapters({ course }) {
  const router = useRouter();

  // useEffect(
  //   (index) => {
  //     isChapterCompleted(index);
  //   },
  //   [course]
  // );

  const isChapterCompleted = (index) => {
    const isCompleted = course?.completedChapter.find((item) => item == index);
    return isCompleted ? true : false;
  };
  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{ fontSize: 20, fontFamily: "outfit-medium", marginTop: 15 }}
      >
        Chapters
      </Text>
      <FlatList
        data={course?.chapters}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/chapterView",
                params: {
                  chapterParams: JSON.stringify(item),
                  docId: course?.docId,
                  chapterIndex: index,
                },
              })
            }
            style={{
              borderWidth: 1,
              padding: 15,
              marginTop: 10,
              borderRadius: 15,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Text style={styles.chapterText} numberOfLines={1}>
                {index + 1}.
              </Text>
              <Text style={styles.chapterText} numberOfLines={1}>
                {item.chapterName}
              </Text>
            </View>
            <View style={{}}>
              {isChapterCompleted(index) ? (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={Colors.GREEN}
                />
              ) : (
                <Ionicons name="play" size={24} color={Colors.PRIMARY} />
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chapterText: {
    fontFamily: "outfit",
    fontSize: 18,
  },
});
