import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import Button from "../../components/shared/Button";
import {
  generateCourseGemini,
  generateTopicsGemini,
} from "../../config/GeminiModel";
import Prompts from "../../constants/Prompts";
import Colors from "../../constants/Colors";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "expo-router";

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState();
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const { userInfo } = useContext(UserContext);
  const router = useRouter();

  const generateTopics = async () => {
    setLoading(true);
    //Get topic ideas from AI
    const PROMPT = userInput + Prompts.IDEA;
    const geminiResponse = await generateTopicsGemini.sendMessage(PROMPT);
    const topicIdea = JSON.parse(geminiResponse.response.text());
    setTopics(topicIdea?.courseTopics);
    // console.log(topicIdea);
    setLoading(false);
  };

  const selectTopics = (topic) => {
    const alreadySelected = selectedTopics.find((item) => item == topic);
    if (!alreadySelected) {
      setSelectedTopics((prev) => [...prev, topic]);
    } else {
      const topics = selectedTopics.filter((item) => item !== topic);
      setSelectedTopics(topics);
    }
  };

  const isTopicSelected = (topic) => {
    const selection = selectedTopics.find((item) => item == topic);
    return selection ? true : false;
  };

  const generateCourse = async () => {
    setLoading(true);
    // console.log(selectedTopics);
    const PROMPT = selectedTopics + Prompts.COURSE;

    try {
      const geminiResponse = await generateCourseGemini.sendMessage(PROMPT);
      const resp = JSON.parse(geminiResponse.response.text());
      const courses = resp.courses;
      console.log(courses);
      //save course to database
      courses?.forEach(async (course) => {
        const docId = Date.now().toString();
        await setDoc(doc(db, "courses", docId), {
          ...course,
          createdOn: new Date(),
          createdBy: userInfo?.email,
          docId: docId,
        });
      });
      setLoading(false);
      router.push("/(tabs)/Home");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <Text style={styles.text1}>Create New Course</Text>
      <Text style={styles.text2}>What do you want to learn today?</Text>
      <Text style={styles.text3}>
        Write the name of the course you want to create ( Example: Learn
        React.js, Business Enterpreneurship, 10th Mathematics Trigonometry )
      </Text>
      <TextInput
        onChangeText={(value) => setUserInput(value)}
        style={styles.input1}
        numberOfLines={3}
        multiline={true}
        placeholder="Write here ..."
      ></TextInput>
      <Button
        text={"Generate Topics"}
        type="outline"
        onPress={() => generateTopics()}
        loading={loading}
        disabled={!userInput}
      />
      <Text style={styles.text4}>
        Select the topics you want to include in your course
      </Text>
      <View style={styles.topicsContainer}>
        {topics.map((topic, index) => (
          <Pressable key={index} onPress={() => selectTopics(topic)}>
            <Text
              style={[
                styles.topic,
                {
                  backgroundColor: isTopicSelected(topic)
                    ? Colors.PRIMARY
                    : "white",
                  color: isTopicSelected(topic) ? "white" : Colors.PRIMARY,
                },
              ]}
            >
              {topic}
            </Text>
          </Pressable>
        ))}
      </View>
      {selectTopics.length > 0 ? (
        <Button
          text={"Add Topics"}
          onPress={() => generateCourse()}
          loading={loading}
          type="outline"
        />
      ) : (
        ""
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
  },
  text1: {
    fontFamily: "outfit-bold",
    fontSize: 25,
  },
  text2: {
    fontFamily: "outfit",
    fontSize: 25,
    marginTop: 20,
  },
  text3: {
    fontFamily: "outfit",
    fontSize: 15,
    color: "gray",
    marginTop: 20,
  },
  input1: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    height: 80,
    alignItems: "flex-start",
  },
  text4: {
    fontFamily: "outfit",
    fontSize: 20,
    color: "gray",
    marginTop: 40,
  },
  topicsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 10,
  },
  topic: {
    fontFamily: "outfit",
    fontSize: 15,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: Colors.PRIMARY,
    borderRadius: 20,
  },
});
