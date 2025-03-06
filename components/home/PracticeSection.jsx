import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { PracticeOptions } from "../../constants/Options";
import { Image } from "react-native";

export default function PracticeSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Practice</Text>

      <View>
        <FlatList
          data={PracticeOptions}
          numColumns={3}
          renderItem={({ item, index }) => (
            <View style={{ borderWidth: 1, flex: 1, marginHorizontal: 3 }}>
              <Image source={item?.image} style={styles.image} />
              <Text style={styles.imageText}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  text1: {
    fontFamily: "outfit-medium",
    fontSize: 25,
    color: Colors.PRIMARY,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 13,
  },
  imageText: {
    position: "absolute",
    padding: 10,
    fontFamily:'outfit-medium',
    fontSize:14,
    color:'white'
  },
});
