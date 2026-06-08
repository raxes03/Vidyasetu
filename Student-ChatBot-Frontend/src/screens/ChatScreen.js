import { View, TouchableOpacity, Text } from "react-native";
import backButton from "../components/backButton";
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { Image as ExpoImage } from "expo-image";
import { Image } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Load initial messages (if any) from your database or API
    setMessages([
      {
        _id: 1,
        text: "Welcome! I’m here to help you find B.Tech colleges in India.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
          avatar:
            "https://png.pngtree.com/png-vector/20220622/ourmid/pngtree-chatbot-color-icon-chat-bot-png-image_5258006.png",
        },
        image:
          "https://png.pngtree.com/png-vector/20221001/ourmid/pngtree-welcome-text-png-image_238949.png",
      },
    ]);
  }, []);

  const onSend = async (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    setLoading(true);
    // Send the new message to your API
    try {
      const response = await fetch(
        "https://student-chatbot-a8hx.onrender.com/chatollamas",
        // "http://192.168.31.130:5001/chatollamas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: newMessages[0].text }),
        }
      );
      const data = await response.json();
      if (data.status === "Ok") {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [
            {
              _id: Math.random().toString(36).substring(7),
              text: data.data,
              createdAt: new Date(),
              user: {
                _id: 2, // Bot's ID
                name: "Bot",
                avatar: "https://placehold.co/60", // Optional: Bot's avatar
              },
              image: data.dataImg,
            },
          ])
        );
        // console.log(data.dataImg);
        setLoading(false);
      } else {
        console.error("Error sending message:", data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderMessageImage = (props) => {
    const { currentMessage } = props;
    return (
      <ExpoImage
        source={{ uri: currentMessage.image }}
        className="w-50 h-40 rounded-lg m-2"
      />
    );
  };

  const handleGoBack = async () => {
    // navigator.goBack();
    navigation.navigate("Home")
    // await removeItem("onboarding");
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-2">
      <View className=" justify-center">
        <Text className="text-3xl font-semibold text-primary text-center">
          Chat
        </Text>
        <TouchableOpacity
          className=" absolute h-10 w-10 bg-gray-300 rounded-full justify-center items-center ml-3"
          onPress={handleGoBack}
        >
          <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
        </TouchableOpacity>
      </View>

      <GiftedChat
        statusBarTranslucent={false}
        messages={messages}
        onSend={onSend}
        isTyping={loading}
        alwaysShowSend={true}
        renderInputToolbar={(props) => (
          <View>
            <View className="flex-row items-center">
              <View className="flex-1">
                <InputToolbar
                  {...props}
                  // className="border-2 border-gray-300 rounded-full p-5"
                  containerStyle={{
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "gray",
                    padding: 5,
                  }}
                  textInputStyle={{ color: "gray" }}
                  placeholder="Type a message..."
                  placeholderTextColor="gray"
                  multiline={false}
                  textInputProps={{
                    returnKeyType: "send",
                  }}
                />
              </View>
            </View>
          </View>
        )}
        renderSend={(props) => (
          <View>
            <Send {...props} containerStyle={{ justifyContent: "center" }}>
              <View className="flex justify-center items-center mr-2">
                <FontAwesome name="send" size={24} color="blue" />
              </View>
            </Send>
          </View>
        )}
        renderMessageImage={renderMessageImage}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: "orange",
                },
              }}
            />
          );
        }}
        user={{
          _id: 1, // User's ID
          name: "User",
          avatar: "https://placehold.co/60", // Optional: User's avatar
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
