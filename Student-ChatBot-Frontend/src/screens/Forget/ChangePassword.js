import { View, Text, TouchableOpacity, TextInput, Image, Dimensions, Alert, ScrollView } from 'react-native'
import LottieView from 'lottie-react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import Animated from 'react-native-reanimated'
import { FadeInDown, FadeInUp } from 'react-native-reanimated'
import ToartMessage from '../../components/ToartMessage'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width, height } = Dimensions.get('window')

const ChangePassword = () => {
    const [email, setEmail] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [acType, setAcType] = useState("");
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastTitle, setToastTitle] = useState("");
    const [toastType, setToastType] = useState("");
    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.goBack();
    }
    const handleSignUp = () => {
        navigation.navigate("SignUp");
    }
    const handleToast = () => {
        setToast(false);
    }
    const handlePassword = (e) => {
        const passwordVar = e.nativeEvent.text;
        setPassword(passwordVar);
        setPasswordVerify(false);
        if (
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(passwordVar)
        ) {
            setPassword(passwordVar);
            setPasswordVerify(true);
        }
    };
    const handleSubmit = () => {
        console.log("Submit", email);
        const userData = {
            email: email,
            password: password,
        }
        console.log(userData);
        axios
            .post("https://student-chatbot-a8hx.onrender.com/reset" || "http://192.168.225.123:5001/reset", userData)
            .then((res) => {
                console.log(res.data);
                setToastType(res.data.status);
                setToastMessage(res.data.data);
                if (res.data.status === "Ok") {
                    // Alert.alert("Password Changed", "Please login with new password");
                    setToastTitle("Password Changed");
                    setToastMessage("Please login with new password");
                    setToast(true);
                    setTimeout(() => {
                        navigation.navigate("Panal");
                    }, 3000)
                } else {
                    // Alert.alert("Password Not Changed", JSON.stringify(res.data));
                    setToastTitle("Password Not Changed");
                    setToast(true);
                }
            })

    }
    useEffect(() => {
        if (toast) {
            setTimeout(() => {
                setToast(false);
            }, 2000);
        }
    }, [toast]) 
    useEffect(() => {
        AsyncStorage.getItem("email").then((value) => {
            setEmail(value);
        })
        AsyncStorage.getItem("acType").then((value) => {
            setAcType(value);
        })
        console.log(acType);

    }, [])
    return (
        <SafeAreaView className='flex-1 bg-white p-5'>
            <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center"
                    onPress={handleGoBack}
                >
                    <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
                </TouchableOpacity>
                <Animated.View className="my-5" entering={FadeInUp.delay(200).duration(1000).springify()}>
                    <Text className="text-3xl font-semibold text-primary mt-5">Change</Text>
                    <Text className="text-3xl font-semibold text-primary">Password ?</Text>
                    <LottieView
                        source={require("../../assets/lottie/16.json")}
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
                <View className="mt-[20%]">
                    <Animated.View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4"
                        entering={FadeInDown.delay(200).duration(1000).springify()}
                    >
                        <SimpleLineIcons name="lock" size={24} color="#AEB5BB" />
                        <TextInput
                            className="flex-1 text-secondary px-2.5 font-light"
                            placeholder="Enter your password"
                            secureTextEntry={secureTextEntry}
                            onChange={(e) => handlePassword(e)} //password validation
                        />
                        {password.length < 1 ? null : passwordVerify ? (
                            <Ionicons name="checkmark-done" size={24} color="#AEB5BB" />
                        ) : (
                            <Ionicons name="close" size={24} color="#AEB5BB" />
                        )}
                        <TouchableOpacity
                            onPress={() => setSecureTextEntry((prev) => !prev)}
                        >
                            <SimpleLineIcons name="eye" size={24} color="#AEB5BB" />
                        </TouchableOpacity>
                    </Animated.View>
                    {password.length < 1 ? null : passwordVerify ? null : (
                        <Text className="text-red-500 text-sm font-light">
                            Uppercase, Lowercase, Number and 8 character long
                        </Text>
                    )}
                    {/* Submit Button */}
                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                        <TouchableOpacity
                            className="bg-primary rounded-full mt-5"
                            onPress={() => handleSubmit()}
                        >

                            <Text className="text-white text-2xl font-semibold text-center p-2.5">
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View className="flex-row justify-center items-center my-10 gap-x-1"
                        entering={FadeInDown.delay(600).duration(1000).springify()}
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
                    </Animated.View>
                </View>
            </ScrollView>
            {/* Toart Message */}
            {
                toast ? <ToartMessage title={toastTitle} des={toastMessage} onPress={handleToast} type={toastType} /> : null
            }
        </SafeAreaView>
    )
}

export default ChangePassword