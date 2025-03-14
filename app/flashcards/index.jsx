import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import * as Progress from "react-native-progress";
import Button from "../../components/shared/Button";
import FlipCard from "react-native-flip-card";

export default function Flashcards() {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const flashcards = course?.flashcards;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const screenWidth = Dimensions.get("screen").width;

  const handleOnScroll = (event) => {
    const index = Math.round(event?.nativeEvent?.contentOffset.x / screenWidth);
    setCurrentPage(index);
  };

  const getProgress = (currentPage) => {
    const perc = currentPage / flashcards?.length;
    return perc;
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("../../assets/images/wave3.png")}
        style={{ height: 400, width: "100%", position: "absolute" }}
      />
      <View style={{ width: "80%" }}>
        <View
          style={{
            //   position: "absolute",
            paddingVertical: 20,
            //   borderWidth: 1,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back-circle" size={40} color={Colors.WHITE} />
          </Pressable>
          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
              fontFamily: "outfit-medium",
              color: Colors.WHITE,
            }}
          >
            {/* {currentPage + 1} /  */}
            {flashcards.length} Cards
          </Text>
        </View>
        {/* <View style={{ alignItems: "center" }}>
          <Progress.Bar
            progress={getProgress(currentPage)}
            width={Dimensions.get("screen").width * 0.85}
            borderColor={Colors.WHITE}
            color={Colors.WHITE}
          />
        </View> */}
        <FlatList
          data={flashcards}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={handleOnScroll}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: Dimensions.get("screen").height * 0.7,
              }}
            >
              <FlipCard
                style={{
                  padding: 25,
                  backgroundColor: Colors.PRIMARY,
                  marginHorizontal: 10,
                  marginVertical: 50,
                  borderRadius: 20,
                  // elevation: 0.1,
                  width: Dimensions.get("screen").width * 0.75,
                  alignItems: "center",
                }}
                friction={10}
                perspective={2000}
                flipHorizontal={true}
                flipVertical={false}
                flip={false}
                clickable={true}
              >
                {/* Face Side */}
                <View style={styles.card}>
                  <Text style={styles.cardText}>{index + 1 + "."}</Text>
                  <Text style={styles.cardText}>{item?.front}</Text>
                </View>
                {/* Back Side */}
                <View style={styles.card}>
                  <Text style={styles.cardText}>{item.back}</Text>
                </View>
              </FlipCard>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: "100%",
    justifyContent: "center",
  },
  cardText: {
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: 25,
    // color: Colors.WHITE,
  },
});
