import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import { UserContext } from "../../context/UserContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import Button from "../../components/shared/Button";
import { signOut } from "firebase/auth";
export default function Profile() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [courseList, setCourseList] = useState([]);
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

  const handleLogout = () => {
    setLoading(true);
    signOut(auth).then(() => {
      //Sign out successfully
      setUserInfo(null);
      router.push("/");
    });
    setLoading(false);
  };
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("../../assets/images/wave3.png")}
        style={{ height: 400, width: "100%", position: "absolute" }}
      />
      {/* personal details */}
      <View style={{ width: 330 }}>
        <View style={styles.container}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
            Personal Info
          </Text>
          <View
            style={{
              marginTop: 15,
              width: "100%",
              gap: 20,
            }}
          >
            <View style={styles.box}>
              <Text style={styles.text}>Name</Text>
              <TextInput
                placeholder={userInfo?.name}
                style={styles.placeholder}
              />
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>Email</Text>
              <TextInput
                placeholder={userInfo?.email}
                style={styles.placeholder}
              />
            </View>
          </View>
        </View>
      </View>
      {/* courses details */}
      <View style={{ width: 330 }}>
        <View style={styles.container}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
            Courses
          </Text>
          <View
            style={{
              marginTop: 15,
              // borderWidth: 1,
              width: "100%",
              gap: 20,
            }}
          >
            <View style={styles.box}>
              <Text style={styles.text}>Courses Created</Text>
              <TextInput
                placeholder={courseList?.length.toString()}
                style={styles.placeholder}
              />
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>Courses Enrolled</Text>
              <TextInput
                placeholder={courseList?.length.toString()}
                style={styles.placeholder}
              />
            </View>
          </View>
        </View>
        <Button
          text={"Logout"}
          color={Colors.FAILURE}
          onPress={() => handleLogout()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    borderRadius: 15,
    elevation: 5,
    padding: 20,
    backgroundColor: Colors.WHITE,
    width: "100%",
    alignItems: "center",
  },
  text: {
    marginBottom: 5,
    fontFamily: "outfit-medium",
    fontSize: 16,
    color: Colors.GRAY,
  },
  placeholder: {
    width: "100%",
    backgroundColor: Colors.LIGHTGRAY,
    borderRadius: 8,
    paddingLeft: 10,
    fontFamily: "outfit-medium",
    fontSize: 16,
  },
  box: {
    display: "flex",
    flexDirection: "col",
  },
});
