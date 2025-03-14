import { View, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Intro from "../../../components/courseView/Intro";
import Colors from "../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

export default function CourseView() {
  const { courseParams, courseId, enroll } = useLocalSearchParams();
  // const course = JSON.parse(courseParams);
  const router = useRouter();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    if (!courseParams) {
      GetCourseById();
    } else {
      setCourse(JSON.parse(courseParams));
    }
  }, [courseId]);

  const GetCourseById = async () => {
    const docRef = await getDoc(doc(db, "courses", courseId));
    const courseData = docRef.data();
    setCourse(courseData);
  };
  return (
    course && (
      <FlatList
        data={[]}
        ListHeaderComponent={
          <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Intro course={course} />
            <Pressable
              style={{ position: "absolute", padding: 10 }}
              onPress={() => router.back()}
            >
              <Ionicons
                name="arrow-back-circle"
                size={40}
                color={Colors.WHITE}
              />
            </Pressable>
          </View>
        }
      />
    )
  );
}
