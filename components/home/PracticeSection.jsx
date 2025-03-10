import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { PracticeOptions } from "../../constants/Options";
import { Image } from "react-native";
import { useRouter } from "expo-router";

export default function PracticeSection() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Practice</Text>

      <View>
        <FlatList
          data={PracticeOptions}
          numColumns={3}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => router.push("/practice/" + item.name)}
              style={{ flex: 1, marginHorizontal: 3 }}
            >
              <Image source={item?.image} style={styles.image} />
              <Text style={styles.imageText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text1: {
    fontFamily: "outfit-medium",
    fontSize: 25,
    color: Colors.WHITE,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 13,
  },
  imageText: {
    position: "absolute",
    padding: 10,
    fontFamily: "outfit-medium",
    fontSize: 14,
    color: "white",
  },
});
