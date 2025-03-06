import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Progress from "react-native-progress";
import { useState } from "react";
import Button from "../../components/shared/Button";
import { db } from "../../config/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export default function ChapterView() {
  const { chapterParams, docId, chapterIndex } = useLocalSearchParams();
  const chapters = JSON.parse(chapterParams);
  const [currentPage, setCurrentPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const getProgress = (currentPage) => {
    const percentage = currentPage / chapters?.content?.length;
    return percentage;
  };
  const onChapterComplete = async () => {
    //save chapter complete and go back
    setLoader(true);
    await updateDoc(doc(db, "courses", docId), {
      completedChapter: arrayUnion(chapterIndex),
    });
    setLoader(false);
    router.replace("/courseView/" + docId);
  };
  return (
    <View style={{ backgroundColor: Colors.WHITE, flex: 1, padding: 25 }}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Progress.Bar
          progress={getProgress(currentPage)}
          width={Dimensions.get("screen").width * 0.875}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{ fontSize: 25, fontFamily: "outfit-medium", marginTop: 25 }}
        >
          {chapters?.content[currentPage]?.topic}
        </Text>
        <Text style={styles.text}>
          {chapters?.content[currentPage]?.explain}
        </Text>
        {chapters?.content[currentPage]?.example && (
          <Text
            style={[
              styles.text,
              {
                marginTop: 15,
                backgroundColor: Colors.LIGHTGRAY,
                paddingHorizontal: 15,
                borderRadius: 15,
              },
            ]}
          >
            {chapters?.content[currentPage]?.example}
          </Text>
        )}
        {chapters?.content[currentPage]?.code && (
          <Text style={styles.text}>
            {chapters?.content[currentPage]?.code}
          </Text>
        )}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          alignSelf: "center",
        }}
      >
        {chapters?.content?.length - 1 != currentPage ? (
          <Button
            text={"Next"}
            onPress={() => setCurrentPage(currentPage + 1)}
          />
        ) : (
          <Button
            text={"Finish"}
            onPress={() => onChapterComplete()}
            loading={loader}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "outfit",
    fontSize: 18,
    paddingVertical: 10,
    textAlign: "justify",
  },
});
