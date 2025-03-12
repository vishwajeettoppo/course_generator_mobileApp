import { View, Text, Image, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function QuestionAnswer() {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const quesAns = course?.qa;
  const router = useRouter();

  const [selectedQues, setSelectedQues] = useState();

  const onQuesSelect = (index) => {
    if (selectedQues == index) {
      setSelectedQues(null);
    } else {
      setSelectedQues(index);
    }
  };
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View style={{}}>
          <Image
            source={require("../../assets/images/wave3.png")}
            style={{ height: 400, width: "100%", position: "absolute" }}
          />
          <View style={{ padding: 20, gap: 40 }}>
            <View
              style={{
                paddingRight: 20,
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Pressable onPress={() => router.back()}>
                <Ionicons
                  name="arrow-back-circle"
                  size={40}
                  color={Colors.WHITE}
                />
              </Pressable>

              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 25,
                  color: Colors.WHITE,
                }}
              >
                Question & Answer
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
                textAlign: "right",
                paddingRight: 10,
                color: Colors.WHITE,
              }}
            >
              {course?.courseTitle}
            </Text>
            <FlatList
              style={{ marginTop: 60 }}
              data={quesAns}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => onQuesSelect(index)}
                  style={{
                    padding: 14,
                    marginVertical: 5,
                    elevation: 1,
                    backgroundColor: Colors.WHITE,
                    borderRadius: 12,
                  }}
                >
                  <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                    {item?.question}
                  </Text>
                  {selectedQues == index && (
                    <View>
                      <Text>{item.answer}</Text>
                    </View>
                  )}
                </Pressable>
              )}
            />
          </View>
        </View>
      }
    />
  );
}
