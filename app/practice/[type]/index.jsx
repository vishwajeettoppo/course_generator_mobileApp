import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PracticeOptions } from "../../../constants/Options";
import { Image } from "react-native";
import Colors from "../../../constants/Colors";
import { db } from "../../../config/firebase";

import Ionicons from "@expo/vector-icons/Ionicons";
import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { UserContext } from "../../../context/UserContext";
import CourseListQuiz from "../../../components/practiceScreen/CourseListQuiz";

export default function PracticeTypeHome() {
  const { type } = useLocalSearchParams();
  const option = PracticeOptions.find((item) => item.name == type);
  const router = useRouter();
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    userInfo && GetCourseList();
  }, [userInfo]);

  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    try {
      const q = query(
        collection(db, "courses"),
        where("createdBy", "==", userInfo?.email),
        orderBy("createdOn", "desc")
      );
      const qSnapshot = await getDocs(q);
      qSnapshot.forEach((doc) => {
        //   console.log(doc.data());
        setCourseList((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View>
      <Image
        source={option.image}
        style={{
          height: 150,
          width: "100%",
          objectFit: "cover",
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}
      />
      <View style={{ position: "absolute", padding: 20 }}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color={Colors.WHITE} />
        </Pressable>
        <Text
          style={{
            marginTop: 10,
            fontSize: 40,
            fontFamily: "outfit-bold",
            color: Colors.WHITE,
          }}
        >
          {type}
        </Text>
      </View>
      {loading && (
        <ActivityIndicator
          size={"large"}
          color={Colors.PRIMARY}
          style={{ marginTop: 150 }}
        />
      )}
      <CourseListQuiz courseList={courseList} option={option} />
    </View>
  );
}
