import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { useState } from "react";
import Button from "../../components/shared/Button";

export default function QuizSummary() {
  const { quizResultParam } = useLocalSearchParams();
  const quizResult = JSON.parse(quizResultParam);
  const [correctAns, setCorrectAns] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const router = useRouter();

  useEffect(() => {
    calculateResult();
  }, []);
  const calculateResult = () => {
    if (quizResult !== undefined) {
      const correctAns_ = Object.entries(quizResult)?.filter(
        ([key, value]) => value?.isCorrect == true
      );
      //   console.log(correctAns);
      const totalQuestions_ = Object.keys(quizResult).length;

      setCorrectAns(correctAns_.length);
      setTotalQuestions(totalQuestions_);
    }
  };

  const perc = () => {
    return (correctAns / totalQuestions) * 100;
  };
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images/wave3.png")}
            style={{
              position: "absolute",
              height: 650,
              width: "100%",
              objectFit: "cover",
            }}
          />
          <View style={{ alignItems: "center", padding: 25, width: "90%" }}>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 25,
                color: Colors.WHITE,
              }}
            >
              Quiz Summary
            </Text>
            <View
              style={{
                padding: 25,
                marginTop: 40,
                backgroundColor: Colors.WHITE,
                width: "100%",
                display: "flex",
                alignItems: "center",
                borderRadius: 15,
              }}
            >
              {perc() >= 70 && (
                <Image
                  source={require("../../assets/images/trophy.png")}
                  style={{ height: 100, objectFit: "contain" }}
                />
              )}
              {perc() >= 70 ? (
                <Text
                  style={{
                    fontFamily: "outfit-medium",
                    fontSize: 16,
                  }}
                >
                  Congratulations!
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "outfit-medium",
                    fontSize: 20,
                    marginBottom: 5,
                  }}
                >
                  Try again!
                </Text>
              )}
              <Text
                style={{
                  fontFamily: "outfit-medium",
                }}
              >
                You've got {perc()}% correct.
              </Text>
              <View
                style={{
                  gap: 10,
                  marginVertical: 15,
                }}
              >
                <View style={[styles.box, {}]}>
                  <Text style={styles.text}>Total Questions</Text>
                  <Text style={styles.text}>{totalQuestions}</Text>
                </View>
                <View style={[styles.box, { borderColor: "green" }]}>
                  <Text style={styles.text}>Correct</Text>
                  <Text style={styles.text}>{correctAns}</Text>
                </View>
                <View
                  style={[
                    styles.box,
                    {
                      borderColor: "red",
                    },
                  ]}
                >
                  <Text style={styles.text}>Incorrect</Text>
                  <Text style={styles.text}>{totalQuestions - correctAns}</Text>
                </View>
              </View>
            </View>
            <Button
              text={"Back to Home"}
              onPress={() => router.replace("/(tabs)/Home")}
            />
            <View style={{ marginTop: 25 }}>
              <FlatList
                data={Object.entries(quizResult)}
                renderItem={({ item, index }) => {
                  const quizItem = item[1];
                  return (
                    <View
                      style={{
                        padding: 10,
                        elevation: 2,
                        // borderWidth: 1,
                        marginTop: 5,
                        borderRadius: 10,
                        backgroundColor:
                          quizItem.isCorrect == true
                            ? Colors.LIGHT_GREEN
                            : Colors.FAILURE,
                      }}
                    >
                      <Text style={{ fontFamily: "outfit" }}>
                        {quizItem.question}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  box: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 2,
    width: 180,
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 15,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  text: {
    fontFamily: "outfit",
  },
});
