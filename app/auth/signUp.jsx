import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { UserContext } from "../../context/UserContext";

export default function SignUp() {
  const router = useRouter();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");

  const { userDetail, setUserDetail } = useContext(UserContext);

  const createNewAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        // console.log(user);
        //save user to DB
        await saveUserToDB(user);
      })
      .catch((err) => {
        console.log(err.message);
      });
    //navigate to new screen
  };

  const saveUserToDB = async (user) => {
    const data = {
      name: fullname,
      email: email,
      member: false,
      uid: user?.uid,
    };
    await setDoc(doc(db, "users", email), data);
    setUserDetail(data);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo2.png")}
        style={{
          height: 150,
          width: 150,
          borderRadius: 100,
          marginBottom: 20,
        }}
      />
      <Text style={styles.text1}>Create New Account</Text>
      <TextInput
        onChangeText={(value) => setFullname(value)}
        placeholder="Full Name"
        style={styles.input1}
      ></TextInput>
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
      <TextInput
        onChangeText={(value) => setcPassword(value)}
        placeholder="Confirm Password"
        secureTextEntry={true}
        style={styles.input1}
      ></TextInput>
      <TouchableOpacity onPress={createNewAccount} style={styles.btn}>
        <Text style={{ color: Colors.WHITE, fontFamily: "outfit" }}>
          Submit
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
        <Text style={styles.text2}>Already have an Account?</Text>
        <Pressable onPress={() => router.push("/auth/signIn")}>
          <Text style={{ fontFamily: "outfit", color: Colors.PRIMARY }}>
            Sign In Here
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
