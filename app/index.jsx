import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { getDoc } from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";


export default function Index() {
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(UserContext);

  onAuthStateChanged(auth, async(user) => {
    if (user) {
      // console.log(user);
      const result = await getDoc(doc(db, "users", user.email));
      console.log(result.data());
      setUserInfo(result.data());
      router.replace('/(tabs)/Home');
    }
  });

  return (
    <View style={styles.main}>
      <Image
        source={require("@/assets/images/hero.jpg")}
        style={{ height: 350, width: "80%", borderRadius: 40 }}
      />
      <View style={styles.bottom}>
        <Text style={styles.title}>Welcome to{"\n"}SelfEd</Text>
        <Text style={styles.caption}>
          "Discover smarter, simpler ways to study.{"\n"} AI designs the perfect
          plan for you."
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/auth/signUp")}
          style={styles.btn}
        >
          <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit" }}>
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/auth/signIn")}
          style={[
            styles.btn,
            {
              backgroundColor: Colors.PRIMARY,
              borderColor: Colors.WHITE,
              borderWidth: 1,
            },
          ]}
        >
          <Text style={{ color: Colors.WHITE, fontFamily: "outfit" }}>
            Already have an Account?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: 30,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
    marginBottom: 20,
    marginTop: 15,
  },
  caption: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    marginBottom: 20,
  },
  btn: {
    width: "90%",
    padding: 18,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    alignItems: "center",
    fontFamily: "outfit-bold",
  },
  bottom: {
    padding: 20,
    marginTop: 20,
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    gap: 20,
  },
});
