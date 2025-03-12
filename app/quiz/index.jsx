import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import * as Progress from "react-native-progress";
import Button from "../../components/shared/Button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Quiz() {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState();
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const getProgress = (currentPage) => {
    const perc = currentPage / course?.quiz?.length;
    return perc;
  };

  onOptionSelect = (selectedChoice) => {
    setResult((prev) => ({
      ...prev,
      [currentPage]: {
        userChoice: selectedChoice,
        isCorrect: course?.quiz[currentPage]?.correctAns == selectedChoice,
        question: course?.quiz[currentPage]?.question,
        correctAns: course?.quiz[currentPage]?.correctAns,
      },
    }));
  };

  const onQuizFinish = async () => {
    //save the result in db
    try {
      setLoading(true);
      await updateDoc(doc(db, "courses", course?.docId), {
        quizResult: result,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    //redirect to quiz summary

    router.replace({
      pathname: "/quiz/summary",
      params: {
        quizResultParam: JSON.stringify(result),
      },
    });
  };
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("../../assets/images/wave3.png")}
        style={{ height: 400, width: "100%", position: "absolute" }}
      />
      <View style={{ width: "85%" }}>
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
            {currentPage + 1} / {course?.quiz.length}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Progress.Bar
            progress={getProgress(currentPage)}
            width={Dimensions.get("screen").width * 0.85}
            borderColor={Colors.WHITE}
            color={Colors.WHITE}
          />
        </View>
        <View
          style={{
            padding: 25,
            backgroundColor: Colors.WHITE,
            marginTop: 50,
            height: Dimensions.get("screen").height * 0.6,
            borderRadius: 20,
            elevation: 5,
          }}
        >
          <Text
            style={{ fontFamily: "outfit", fontSize: 20, marginBottom: 20 }}
          >
            {course?.quiz[currentPage]?.question}
          </Text>
          {course?.quiz[currentPage]?.options.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedOption(index);
                onOptionSelect(item);
              }}
              style={{
                borderWidth: 0.8,
                padding: 15,
                marginVertical: 10,
                borderRadius: 15,
                // elevation: 4,
                backgroundColor:
                  selectedOption == index ? Colors.LIGHT_GREEN : Colors.WHITE,
              }}
            >
              <Text style={{ fontFamily: "outfit", fontSize: 16 }}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedOption?.toString() && course.quiz.length - 1 > currentPage && (
          <Button
            text={"Next"}
            onPress={() => {
              setCurrentPage(currentPage + 1);
              setSelectedOption(null);
            }}
          />
        )}
        {selectedOption?.toString() &&
          course.quiz.length - 1 == currentPage && (
            <Button
              text={"Finish"}
              loading={loading}
              onPress={() => {
                onQuizFinish();
              }}
            />
          )}
      </View>
    </View>
  );
}
