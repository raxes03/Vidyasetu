import { View, Text  , TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const handleGoBack = () => {
    navigator.goBack();
}

const backButton = () => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center"
      onPress={handleGoBack}
    >
      <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
    </TouchableOpacity>
  );
};

export default backButton;
