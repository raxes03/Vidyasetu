import { View, Text, TouchableOpacity, TextInput, Image, Dimensions, Alert, ScrollView } from 'react-native'
import LottieView from 'lottie-react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { OtpInput } from 'react-native-otp-entry'
import Animated from 'react-native-reanimated'
import { FadeInDown, FadeInUp } from 'react-native-reanimated'
import ToartMessage from '../../components/ToartMessage'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width, height } = Dimensions.get('window')

const OtpPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [isLogin, setIsLogin] = useState("");
    const [stLogin, setStLogin] = useState("login");
    const [acType, setAcType] = useState("");
    const [login, setLogin] = useState(true);
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastTitle, setToastTitle] = useState("");
    const [toastType, setToastType] = useState("");
    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.goBack();
    }
    const handleToast = () => {
        setToast(false);
    }
    const handleSubmit = () => {
        console.log("Submit", email);
        const userData = {
            email: email,
            otp: otp,
        }
        console.log(userData);
        axios
            .post("https://student-chatbot-a8hx.onrender.com/otpverify" || "http://192.168.225.123:5001/otpverify", userData)
            .then((res) => {
                console.log(res.data);
                setToastType(res.data.status);
                setToastMessage(res.data.data);
                if (res.data.status === "Ok") {
                    // Alert.alert("Otp Verified");
                    setToastTitle("Otp Verified");
                    setToast(true);
                    setTimeout(() => {
                        navigation.navigate("ChangePassword");
                    },3000)
                } else {
                    // Alert.alert("Otp Not Verified", JSON.stringify(res.data));
                    setToastTitle("Otp Not Verified");
                    setToast(true);
                }
            })
    }
    const handleResendCode = () => {
        const userData = {
            email: email,
        }
        axios
            .post("https://student-chatbot-a8hx.onrender.com/otpResend", userData)
            .then((res) => {
                console.log(res.data);
                setToastType(res.data.status);
                if (res.data.status === "Ok") {
                    // Alert.alert("Otp Resend", "Please check your email");
                    setToastTitle("Otp Resend");
                    setToastMessage("Please check your email");
                    setToast(true);
                } else {
                    // Alert.alert("Otp Not Resend", JSON.stringify(res.data));
                    setToastMessage(res.data.data);
                    setToastTitle("Otp Not Resend");
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
        AsyncStorage.getItem("isLogin").then((value) => {
            setIsLogin(value);
        })
        AsyncStorage.getItem("acType").then((value) => {
            setAcType(value);
        })
        console.log(isLogin);
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
                    <Text className="text-3xl font-semibold text-primary">OTP</Text>
                    <Text className="text-3xl font-semibold text-primary">Verification</Text>
                    <Text className="text-3xl font-semibold text-primary">Code</Text>
                    <LottieView
                        source={require("../../assets/lottie/Otp.json")}
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
                    <Animated.View
                        entering={FadeInDown.delay(200).duration(1000).springify()}
                    >
                        <OtpInput
                            numberOfDigits={6}
                            style={{ width: width * 0.8, height: 50 }}
                            onChange={(e) => setOtp(e.nativeEvent.text)}
                            onTextChange={setOtp}
                            value={otp}
                        />
                    </Animated.View>
                    <Animated.View className="flex-row justify-center items-center my-10 gap-x-1"
                        entering={FadeInDown.delay(400).duration(1000).springify()}
                    >
                        <Text className="text-primary font-normal">
                            Don't receive the code?
                        </Text>
                        {/* Sign up Button */}
                        <TouchableOpacity className='' onPress={handleResendCode}>
                            <Text className="text-primary font-bold" >
                                Resend Code
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                    {/* Submit Button */}
                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
                        <TouchableOpacity
                            className="bg-primary rounded-full mt-5"
                            onPress={() => handleSubmit()}

                        >
                            <Text className="text-white text-2xl font-semibold text-center p-2.5">
                                Submit
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

export default OtpPassword