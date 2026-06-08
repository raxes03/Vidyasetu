import { View, Text, TouchableOpacity, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import LottieView from "lottie-react-native";

const CollegeManagement = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  }
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className=' items-center justify-between p-3 flex-row'>
        <TouchableOpacity className='w-10 h-10 bg-gray-300 items-center justify-center rounded-full' onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#45484A" />
        </TouchableOpacity>
        <Text className='text-xl font-semibold'>College Management</Text>
        <TouchableOpacity className='w-10 h-10 bg-gray-300 items-center justify-center rounded-full'>
          <Ionicons name="menu" size={32} color="#45484A" />
        </TouchableOpacity>
      </View>
      <View>
        <Text className='text-center text-2xl font-semibold'>College Management</Text>
        <View className='flex-row items-center justify-between p-3'>
          <TouchableOpacity className='w-44 h-44 bg-gray-300 items-center justify-center rounded-lg'>
            <Text className='text-xl font-semibold'>Add College</Text>
          </TouchableOpacity>
          <TouchableOpacity className='w-44 h-44 bg-gray-300 items-center justify-center rounded-lg'>
            <Text className='text-xl font-semibold'>Edit College</Text>
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center justify-between p-3'>
          <TouchableOpacity className='w-44 h-44 bg-gray-300 items-center justify-center rounded-lg'>
            <Text className='text-xl font-semibold'>Delete College</Text>
          </TouchableOpacity>
          <TouchableOpacity className='w-44 h-44 bg-gray-300 items-center justify-center rounded-lg'>
            <Text className='text-xl font-semibold'>View College</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default CollegeManagement