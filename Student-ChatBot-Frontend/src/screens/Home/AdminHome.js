import { View, Text, TouchableOpacity, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import LottieView from "lottie-react-native";

const AdminHome = () => {
  const navigation = useNavigation();
  const CollegeManagement = () => {
    navigation.navigate("CollegeManagement");
  }
  const DataVerify = () => {
    navigation.navigate("DataVerify");
  }
  const ReportAnalytics = () => {
    navigation.navigate("ReportAnalytics");
  }
  const handleProfile = () => {
    navigation.navigate("Profile");
  }
  const handleBackCheck = () => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    })
  }
  useEffect(() => {
    handleBackCheck();
  },[])
  return (
    <SafeAreaView className='flex-1 bg-white p-5'>
      <View className='justify-between items-center flex-row'>
        {/* <TouchableOpacity
          className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center"
          onPress={handleGoBack}
        >
          <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
        </TouchableOpacity> */}
        <Text className='font-semibold text-3xl text-center'>
          Government Panel
        </Text>
        <TouchableOpacity className='bg-gray-300 h-10 w-10 rounded-full justify-center items-center' onPress={handleProfile}>
          <Ionicons name="menu" size={32} color="#45484A" />
        </TouchableOpacity>
      </View>
      <View className=' justify-center items-center mt-[10%]'>
        <LottieView source={require('../../assets/lottie/welcome.json')} className='w-[500px] h-[300px]'
          autoPlay loop
        />
      </View>
      <View className='justify-between flex-col gap-4 mt-[20%]'>
        <TouchableOpacity className='border-2 rounded-full p-2.5 bg-primary border-secondary' onPress={CollegeManagement}>
          <Text className='font-semibold text-xl text-center text-white'>College A/C Management</Text>
        </TouchableOpacity>
        <TouchableOpacity className='border-2 rounded-full p-2.5 bg-primary border-secondary' onPress={DataVerify}>
          <Text className='font-semibold text-xl text-center text-white'>Data Verification Of College</Text>
        </TouchableOpacity>
        <TouchableOpacity className='border-2 rounded-full p-2.5 bg-primary border-secondary' onPress={ReportAnalytics}>
          <Text className='font-semibold text-xl text-center text-white'>Reports & Analytics</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AdminHome