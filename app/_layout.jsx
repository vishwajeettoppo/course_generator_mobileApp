import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { UserContext } from "@/context/UserContext";
import { useState } from "react";

export default function RootLayout() {
  useFonts({
    "outfit": require("@/assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("@/assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("@/assets/fonts/Outfit-Medium.ttf"),
  });

  const [userInfo, setUserInfo] = useState();

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </UserContext.Provider>
  );
}
