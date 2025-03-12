import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import CourseProgressCard from "../../components/shared/CourseProgressCard";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function Progress() {
  const [courseList, setCourseList] = useState([]);
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    <View>
      <Image
        source={require("../../assets/images/wave3.png")}
        style={{ height: 400, width: "100%", position: "absolute" }}
      />
      <View style={{ padding: 25 }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 25,
            marginBottom: 30,
            marginTop: 10,
            color: Colors.WHITE,
          }}
        >
          Course Progress
        </Text>
        <View
          style={{
            alignItems: "center",
            width: "100%",
          }}
        >
          <FlatList
            data={courseList}
            showsVerticalScrollIndicator={false}
            onRefresh={() => getCourseList()}
            refreshing={loading}
            style={{
              width: "100%",
            }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/courseView/" + item?.docId,
                    params: {
                      courseParams: JSON.stringify(item),
                    },
                  })
                }
              >
                <CourseProgressCard item={item} width={"100%"} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
}
