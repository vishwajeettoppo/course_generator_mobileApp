import { View, Text, Image } from "react-native";
import React, { useContext, useState } from "react";
import { imageAssets } from "../../constants/Options";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Button from "../shared/Button";
import Chapters from "./Chapters";
import { UserContext } from "../../context/UserContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Intro({ course, enroll }) {
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const onEnrollCourse = async () => {
    setLoading(true);
    const docId = Date.now().toString();
    const data = {
      ...course,
      createdBy: userInfo?.email,
      createdOn: new Date(),
      enroll: true,
    };
    await setDoc(doc(db, "courses", docId), data);
    router.push({
      pathname: "/courseView/" + docId,
      params: {
        courseParams: JSON.stringify(data),
        enroll: false,
      },
    });
    setLoading(false);
  };
  return (
    <View>
      <Image
        source={imageAssets[course?.bannerImage]}
        style={{ width: "100%", height: 250 }}
      />
      <View style={{ padding: 25 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
          {course?.courseTitle}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Ionicons name="book-outline" size={20} color={Colors.GRAY} />
          <Text style={{ fontSize: 16, fontFamily: "outfit" }}>
            {course?.chapters?.length} Chapters
          </Text>
        </View>
        <Text
          style={{ fontSize: 20, fontFamily: "outfit-medium", marginTop: 20 }}
        >
          Description:
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "outfit",
            marginTop: 5,
            color: Colors.GRAY,
          }}
        >
          {course?.description}
        </Text>
        {enroll == "true" ? (
          <Button
            text={"Enroll Now"}
            onPress={() => onEnrollCourse()}
            loading={loading}
          />
        ) : (
          <Button text={"Start Now"} />
        )}
        <Chapters course={course} />
      </View>
    </View>
  );
}
