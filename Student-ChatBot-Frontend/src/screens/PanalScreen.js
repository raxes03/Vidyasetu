import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome6, FontAwesome5 } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { setItem } from "../utils/asyncStorage";
import { FadeInDown, FadeInUp } from "react-native-reanimated";
import Animated from "react-native-reanimated"
import React from "react";

const { width, height } = Dimensions.get("window");

const PanalScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate("Onboarding");
  };

  const handleAdmin = () => {
    navigation.navigate("AdminLogin");
    setItem("accountType", "admin");
  };

  const handleCollege = () => {
    navigation.navigate("CollegeLogin");
    setItem("accountType", "college");
  };

  const handleStudent = () => {
    navigation.navigate("Login");
    setItem("accountType", "student");
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      
      <TouchableOpacity
        className="bg-gray-300 rounded-full h-10 w-10 justify-center items-center"
        onPress={handleGoBack}
      >
        <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
      </TouchableOpacity>
      <Animated.View className="my-5" entering={FadeInUp.delay(200).duration(1000).springify()}>
        <Text className="text-3xl text-primary font-semibold">Select</Text>
        <Text className="text-3xl text-primary font-semibold">
          Account Type
        </Text>
        <Text className="text-3xl text-primary font-semibold">
          For Login
        </Text>
      </Animated.View>
      <Animated.View className="justify-center items-center" entering={FadeInUp.delay(200).duration(1000).springify()}>
        <LottieView
          source={require("../assets/lottie/1.json")}
          style={{ width: width - 20, height: height / 2 }}
          autoPlay
          loop
        />
      </Animated.View>
      <Animated.View className="flex-row justify-between mt-3 p-5"
        entering={FadeInDown.duration(1000).springify()}
      >
        <Animated.View sharedTransitionTag={''}>
            <TouchableOpacity className="rounded-full h-20 w-20 justify-center items-center bg-gray-300"
            onPress={handleAdmin}
          >
            <FontAwesome6 name="user-gear" size={32} color="black" />
          </TouchableOpacity>
          <Text className="text-center font-semibold text-xl">Gov</Text>
          <Text className="text-center font-semibold text-xl">Admin</Text>
        </Animated.View>
        <View>
          <TouchableOpacity className="rounded-full h-20 w-20 justify-center items-center bg-gray-300"
            onPress={handleCollege}
          >
            <FontAwesome6 name="user-graduate" size={32} color="black" />
          </TouchableOpacity>
          <Text className="text-center font-semibold text-xl">College</Text>
          <Text className="text-center font-semibold text-xl">Admin</Text>
        </View>
        <View>
          <TouchableOpacity className="rounded-full h-20 w-20 justify-center items-center bg-gray-300"
            onPress={handleStudent}
          >
            <FontAwesome5 name="user-alt" size={32} color="black" />
          </TouchableOpacity>
          <Text className="text-center font-semibold text-xl">Student</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default PanalScreen;
