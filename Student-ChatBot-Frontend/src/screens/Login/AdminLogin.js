import { View, Text, TouchableOpacity, TextInput, Image, Dimensions, Alert, ScrollView } from 'react-native'
import LottieView from 'lottie-react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import Animated from 'react-native-reanimated'
import { FadeInDown, FadeInUp } from 'react-native-reanimated'
import ToartMessage from "../../components/ToartMessage";
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width, height } = Dimensions.get('window')

const AdminLogin = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acType, setAcType] = useState("admin");
  const [isLogin, setIsLogin] = useState("login");
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastTitle, setToastTitle] = useState("");
  const [toastType, setToastType] = useState("");
  const navigation = useNavigation();

  const handleGoBack = () => {
    // await removeItem("onboarding");
    navigation.goBack();
  };

  const handleSignUp = () => {
    navigation.navigate("AdminSignUp");
  };

  const handleHomeWithOutLogin = () => {
    navigation.navigate("Home");
  };

  const handleForgetPassword = () => {
    navigation.navigate("ForgetPassword");
    AsyncStorage.setItem("acType", acType);
  }

  const handleToast = () => {
    setToast(false);
  }

  const handleSubmit = () => {
    const userData = {
      email: email,
      password,
    };
    console.log(email, password);
    axios
      .post("https://student-chatbot-a8hx.onrender.com/adminLogin", userData)
      // .post("http://192.168.31.130:5001/adminLogin",userData)
      .then((res) => {
        console.log(res.data);
        setToastType(res.data.status);        
        setToastMessage(res.data.data);
        if (res.data.status === "Ok") {
          // Alert.alert("Otp Send On Gmail");
          setToastTitle("Otp Send On Gmail");
          setToast(true);
          AsyncStorage.setItem("token", res.data.token);
          AsyncStorage.setItem("acType", acType);
          AsyncStorage.setItem("login", isLogin)
          AsyncStorage.setItem("email", email);
          setTimeout(() => {
            navigation.navigate("OtpVerify");
          },3000)
        } else {
          setToastTitle("Login Failed");
          setToast(true);
        }
      });
  };

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
  }, [toast])

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center"
            onPress={handleGoBack}
          >
            <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
          </TouchableOpacity>
          <Animated.View className="my-5" entering={FadeInUp.duration(1000).springify()}>
            <Text className="text-3xl font-semibold text-primary">Hey ,</Text>
            <Text className="text-3xl font-semibold text-primary">Welcome</Text>
            <Text className="text-3xl font-semibold text-primary">Admin</Text>
            <LottieView
              source={require("../../assets/lottie/11.json")}
              className="absolute"
              style={{
                width: width * 0.5,
                height: width * 1,
                top: height / 2 - width * 1.4,
                right: height / 2 - width * 1,
              }}
              autoPlay
              loop
            />
          </Animated.View>
          {/* form */}
          <View className="mt-5">
            {/* Email */}
            <Animated.View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4"
              entering={FadeInDown.duration(1000).springify()}
            >
              <Ionicons name="mail-outline" size={24} color="#AEB5BB" />
              <TextInput
                className="flex-1 text-secondary px-2.5 font-light"
                placeholder="Enter your email"
                keyboardType="email-address"
                onChange={(e) => setEmail(e.nativeEvent.text)}
              />
            </Animated.View>
            {/* Password */}
            <Animated.View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4"
              entering={FadeInDown.delay(200).duration(1000).springify()}
            >
              <SimpleLineIcons name="lock" size={24} color="#AEB5BB" />
              <TextInput
                className="flex-1 text-secondary px-2.5 font-light"
                placeholder="Enter your password"
                secureTextEntry={secureTextEntry}
                onChange={(e) => setPassword(e.nativeEvent.text)}
              />
              <TouchableOpacity
                onPress={() => setSecureTextEntry((prev) => !prev)}
              >
                <SimpleLineIcons name="eye" size={24} color="#AEB5BB" />
              </TouchableOpacity>
            </Animated.View>
            {/* Forget Password */}
            <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} >
              <TouchableOpacity onPress={handleForgetPassword}>
                <Text className="text-primary text-right font-semibold my-2.5">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </Animated.View>
            {/* Login Button */}
            <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
              <TouchableOpacity
                className="bg-primary rounded-full mt-5"
                onPress={() => handleSubmit()}
              >
                <Text className="text-white text-2xl font-semibold text-center p-2.5">
                  Login
                </Text>
              </TouchableOpacity>
            </Animated.View>
            {/* <Text className="text-center my-5 text-lg text-primary">
              or continue with
            </Text> */}
            {/* Google Button */}
            {/* <TouchableOpacity className="justify-center items-center bg-white rounded-full flex-row border-2 border-primary">
              <Image
                source={require("../assets/image/google.png")}
                className="h-5 w-5"
              />
              <Text className="text-primary text-2xl font-semibold text-center p-2.5">
                Google
              </Text>
            </TouchableOpacity> */}
            <Animated.View className="flex-row justify-center items-center my-10 gap-x-1"
              entering={FadeInDown.delay(800).duration(1000).springify()}
            >
              <Text className="text-primary font-normal">
                Don't have an account?
              </Text>
              {/* Sign up Button */}
              <TouchableOpacity>
                <Text className="text-primary font-bold" onPress={handleSignUp}>
                  Sign up
                </Text>
              </TouchableOpacity>
              {/* Gaust Login */}
            </Animated.View>
          </View>
        </ScrollView>
      {/* Toart Message */}
      {
        toast ? <ToartMessage title={toastTitle} des={toastMessage} onPress={handleToast} type={toastType} /> : null
      }
    </SafeAreaView>
  );
}
export default AdminLogin