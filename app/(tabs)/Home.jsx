import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/home/Header";
import Colors from "../../constants/Colors";
import NoCourse from "../../components/home/NoCourse";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { UserContext } from "../../context/UserContext";
import CourseList from "../../components/home/CourseList";
import PracticeSection from "../../components/home/PracticeSection";
import CourseProgress from "../../components/home/CourseProgress";

export default function Home() {
  const [courseList, setCourseList] = useState([]);
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userInfo && getCourseList();
  }, [userInfo]);

  const getCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    const q = query(
      collection(db, "courses"),
      where("createdBy", "==", userInfo?.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };
  return (
    <FlatList
      data={[]}
      onRefresh={() => getCourseList()}
      refreshing={loading}
      ListHeaderComponent={
        <View style={styles.container}>
          <Header />
          {courseList?.length == 0 ? (
            <NoCourse />
          ) : (
            <View style={{ display: "flex", gap: 15 }}>
              <CourseProgress courseList={courseList} />
              <PracticeSection />
              <CourseList courseList={courseList} />
            </View>
          )}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: Platform.OS === "ios" && 45,
    paddingHorizontal: 30,
  },
});
