import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { UserContext } from "../../context/UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        // console.log(user);
        await getUserDetail();
        setLoading(false);
        if (Platform.OS === "web") {
          Alert.alert("Login Successful");
        } else {
          ToastAndroid.show("Login Successful", ToastAndroid.SHORT);
        }
        router.replace("/(tabs)/Home");
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        if (Platform.OS === "web") {
          Alert.alert("Incorrect Email or Password");
        } else {
          ToastAndroid.show("Incorrect Email or Password", ToastAndroid.SHORT);
        }
      });
  };

  const getUserDetail = async () => {
    const result = await getDoc(doc(db, "users", email));
    console.log(result.data());
    setUserInfo(result.data());
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo2.png")}
        style={{ height: 150, width: 150, borderRadius: 100, marginBottom: 20 }}
      />
      <Text style={styles.text1}>Welcome Back</Text>
      <TextInput
        onChangeText={(value) => setEmail(value)}
        placeholder="Email"
        style={styles.input1}
      ></TextInput>
      <TextInput
        onChangeText={(value) => setPassword(value)}
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input1}
      ></TextInput>

      <TouchableOpacity
        onPress={handleClick}
        style={styles.btn}
        disabled={loading}
      >
        {!loading ? (
          <Text style={{ color: Colors.WHITE, fontFamily: "outfit" }}>
            Sign In
          </Text>
        ) : (
          <ActivityIndicator size="large" color={Colors.WHITE} />
        )}
      </TouchableOpacity>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
        <Text style={styles.text2}>Don't have an Account?</Text>
        <Pressable onPress={() => router.push("/auth/signUp")}>
          <Text style={{ fontFamily: "outfit", color: Colors.PRIMARY }}>
            Sign Up Now
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  text1: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    color: Colors.PRIMARY,
  },
  input1: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontFamily: "outfit",
  },
  btn: {
    width: "80%",
    height: 50,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    alignItems: "center",
    fontFamily: "outfit-bold",
    justifyContent: "center",
  },
  text2: {
    fontSize: 16,
    fontFamily: "outfit",
  },
});
