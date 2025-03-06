import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Button from "../shared/Button";
import {useRouter} from 'expo-router'

export default function NoCourse() {
    const router= useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/noCourse.png")}
        style={styles.image1}
      />
      <Text style={styles.text1}>You Don't Have Any Course</Text>
      <Button text='+ Create New Course' onPress={()=>router.push('/addCourse')}/>
      <Button text='Explore Existing Courses' type="outline"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    marginTop: 30,
    padding: 30,
  },
  image1: {
    width: 300,
    height: 300,
  },
  text1: {
    fontFamily: "outfit",
    fontSize: 15,
    color: Colors.GRAY,
    textAlign: "center",
    marginBottom: 60,
  },
});
