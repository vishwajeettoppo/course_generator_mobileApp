import { View, Text, FlatList } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { courseCategory } from "../../constants/Options";
import CourseListByCategory from "../../components/explore/CourseListByCategory";

export default function Explore() {
  return (
    <FlatList
      data={[]}
      style={{ flex: 1, backgroundColor: Colors.WHITE }}
      ListHeaderComponent={
        <View style={{ padding: 25 }}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
            Explore More Courses
          </Text>
          {courseCategory.map((item, index) => (
            <View key={index} style={{ marginTop: 10 }}>
              {/* <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
                {item}
              </Text> */}
              <CourseListByCategory category={item} />
            </View>
          ))}
        </View>
      }
    />
  );
}
