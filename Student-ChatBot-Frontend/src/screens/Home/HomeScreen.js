import { View, Text, TouchableOpacity, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import LottieView from "lottie-react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [stayLogin, setStayLogin] = useState(null);
  const navigation = useNavigation();
  const handleGoBack = () => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    })
  };

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("stayLogin")
    navigation.navigate("Panal");
  }

  const handleChat = async () => {
    navigation.navigate("Chat")
  }

  const handleMenu = () => {
    navigation.navigate("Profile")
  }

  const handleCheck = async () => {
    const stayLogin = await AsyncStorage.getItem("stayLogin")
    setStayLogin(stayLogin)
    // console.log(stayLogin)
  }

  useEffect(() => {
    handleGoBack();
    handleCheck();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <View className='justify-between items-center flex-row'>
        <Text className='font-semibold text-3xl text-center'>
          Home
        </Text>
        {stayLogin == 'student' && <TouchableOpacity className='bg-gray-300 h-10 w-10 rounded-full justify-center items-center' onPress={handleMenu}>
          <Ionicons name="menu" size={32} color="#45484A" />
        </TouchableOpacity>}
      </View>
      <View className='justify-center items-center mt-3'>
        <LottieView source={require('../../assets/lottie/Robot.json')} className='w-[300px] h-[300px]'
          autoPlay loop
        />
      </View>
      <View className='justify-center p-2 left-[80px] mt-6'>
        <Text className='text-4xl font-semibold text-secondary'>May</Text>
        <Text className='text-4xl font-semibold text-secondary'>I</Text>
        <Text className='text-4xl font-semibold text-secondary'>Help You ?</Text>
      </View>
      <View className='mt-[40%]'>
        <TouchableOpacity className='border-2 rounded-full p-2.5 bg-primary border-secondary' onPress={handleChat}>
          <Text className='font-semibold text-xl text-center text-white'>Chat</Text>
        </TouchableOpacity>
        {stayLogin == 'guest' && <TouchableOpacity className='border-2 rounded-full p-2.5 bg-primary border-secondary' onPress={handleLogOut}>
          <Text className='font-semibold text-xl text-center text-white'>LogOut</Text>
        </TouchableOpacity>}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
