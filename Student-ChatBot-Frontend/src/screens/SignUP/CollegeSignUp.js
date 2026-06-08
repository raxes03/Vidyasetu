import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    Dimensions,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import Animated from "react-native-reanimated";
import { FadeInDown, FadeInUp } from "react-native-reanimated";
import ToartMessage from "../../components/ToartMessage";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const CollegeSignUp = () => {
    const [name, setName] = useState("");
    const [nameVerify, setNameVerify] = useState(false);
    const [phone, setPhone] = useState("");
    const [phoneVerify, setPhoneVerify] = useState(false);
    const [email, setEmail] = useState("");
    const [emailVerify, setEmailVerify] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [college, setCollege] = useState("");
    const [collegeVerify, setCollegeVerify] = useState(false);
    const [city, setCity] = useState("");
    const [cityVerify, setCityVerify] = useState(false);

    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastTitle, setToastTitle] = useState("");
    const [toastType, setToastType] = useState("");


    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const navigation = useNavigation();

    const handleName = (e) => {
        const nameVar = e.nativeEvent.text;
        setName(nameVar);
        setNameVerify(false);
        if (nameVar.length > 1) {
            setNameVerify(true);
        }
    };

    const handlePhone = (e) => {
        const phoneVar = e.nativeEvent.text;
        setPhone(phoneVar);
        setPhoneVerify(false);
        if (/^\d{10}$/.test(phoneVar)) {
            setPhone(phoneVar);
            setPhoneVerify(true);
        }
    };

    const handleEmail = (e) => {
        const emailVar = e.nativeEvent.text;
        setEmail(emailVar);
        setEmailVerify(false);
        if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
            setEmail(emailVar);
            setEmailVerify(true);
        }
    };

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

    const handleCollege = (e) => {
        const collegeVar = e.nativeEvent.text;
        setCollege(collegeVar);
        setCollegeVerify(false);
        if (collegeVar.length > 1) {
            setCollegeVerify(true);
        }
    }

    const handleLogin = () => {
        navigation.navigate("CollegeLogin");
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleToast = () => {
        setToast(false);
    };

    const handleSubmit = () => {
        const userData = {
            name: name,
            phone,
            email,
            password,
            college,
        };
        if (nameVerify && phoneVerify && emailVerify && passwordVerify && collegeVerify) {
            axios
                .post(
                    "https://student-chatbot-a8hx.onrender.com/registerCollege",
                    // "http://192.168.31.130:5001/registerCollege",
                    userData
                )
                .then((res) => {
                    console.log(res.data);
                    setToastType(res.data.status);
                    setToastMessage(res.data.data);
                    if (res.data.status === "Ok") {
                        setToastTitle("Register Success");
                        setToastMessage(res.data.userName);
                        setToast(true);
                        // Alert.alert("Success", "Register Success", [
                        //   { text: "OK", onPress: () => handleLogin() },
                        // ]);
                        setTimeout(() => {
                            navigation.navigate("CollegeLogin");
                        },5000)
                    } else {
                        setToastTitle("Error");
                        setToast(true);
                        // Alert.alert("Error", JSON.stringify(res.data), [
                        //   { text: "OK", onPress: () => console.log("OK Pressed") },
                        // ]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            // Alert.alert("Error", "Please fill the form correctly", [
            //   { text: "OK", onPress: () => console.log("OK Pressed") },
            // ]);
            setToastTitle("Error");
            setToastMessage("Please fill the form correctly");
            setToastType("error");
            setToast(true);
        }
    };

    useEffect(() => {
        if (toast) {
            setTimeout(() => {
                setToast(false);
            }, 4000);
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
                    <Text className="text-3xl font-semibold text-primary">Let's Get</Text>
                    <Text className="text-3xl font-semibold text-primary">Started</Text>
                    <LottieView
                        source={require("../../assets/lottie/13.json")}
                        className="absolute"
                        style={{
                            width: width * 0.5,
                            height: width * 1.1,
                            top: height / 2 - width * 1.5,
                            right: height / 2 - width * 1.05,
                        }}
                        autoPlay
                        loop
                    />
                </Animated.View>
                {/* form */}
                <View className="mt-5">
                    {/* Name form */}
                    <Animated.View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4"
                        entering={FadeInDown.duration(1000).springify()}
                    >
                        <AntDesign name="user" size={24} color="#AEB5BB" />
                        <TextInput
                            className="flex-1 text-secondary px-2.5 font-light"
                            placeholder="Enter Your username"
                            onChange={(e) => handleName(e)} //name validation
                        />
                        {name.length < 1 ? null : nameVerify ? (
                            <Ionicons name="checkmark-done" size={24} color="#AEB5BB" />
                        ) : (
                            <Ionicons name="close" size={24} color="#AEB5BB" />
                        )}
                    </Animated.View>
                    {name.length < 1 ? null : nameVerify ? null : (
                        <Text className="text-red-500 text-sm font-light">
                            Name should be more then 1 character
                        </Text>
                    )}
                    {/* College form */}
                    <Animated.View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4"
                        entering={FadeInDown.delay(100).duration(1000).springify()}
                    >
                        <Ionicons name="school-outline" size={24} color="#AEB5BB" />
                        <TextInput
                            className="flex-1 text-secondary px-2.5 font-light"
                            placeholder="Enter your college name"
                            onChange={(e) => handleCollege(e)} //college validation
                        />
                        {college.length < 1 ? null : collegeVerify ? (
                            <Ionicons name="checkmark-done" size={24} color="#AEB5BB" />
                        ) : (
                            <Ionicons name="close" size={24} color="#AEB5BB" />
                        )}
                    </Animated.View>
                    {college.length < 1 ? null : collegeVerify ? null : (
                        <Text className="text-red-500 text-sm font-light">
                            College name should be more then 1 character
                        </Text>
                    )}
                    {/* Phone form */}
                    <Animated.View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4"
                        entering={FadeInDown.delay(200).duration(1000).springify()}
                    >
                        <Ionicons name="call-outline" size={24} color="#AEB5BB" />
                        <TextInput
                            className="flex-1 text-secondary px-2.5 font-light"
                            placeholder="Enter your phone number"
                            onChange={(e) => handlePhone(e)} //email validation
                        />
                        {phone.length < 1 ? null : phoneVerify ? (
                            <Ionicons name="checkmark-done" size={24} color="#AEB5BB" />
                        ) : (
                            <Ionicons name="close" size={24} color="#AEB5BB" />
                        )}
                    </Animated.View>
                    {phone.length < 1 ? null : phoneVerify ? null : (
                        <Text className="text-red-500 text-sm font-light">
                            Enter Proper Phone Number
                        </Text>
                    )}
                    {/* Email form */}
                    <Animated.View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4"
                        entering={FadeInDown.delay(400).duration(1000).springify()}
                    >
                        <Ionicons name="mail-outline" size={24} color="#AEB5BB" />
                        <TextInput
                            className="flex-1 text-secondary px-2.5 font-light"
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            onChange={(e) => handleEmail(e)} //email validation
                        />
                        {email.length < 1 ? null : emailVerify ? (
                            <Ionicons name="checkmark-done" size={24} color="#AEB5BB" />
                        ) : (
                            <Ionicons name="close" size={24} color="#AEB5BB" />
                        )}
                    </Animated.View>
                    {email.length < 1 ? null : emailVerify ? null : (
                        <Text className="text-red-500 text-sm font-light">
                            Enter Proper Email Address
                        </Text>
                    )}
                    {/* Password form */}
                    <Animated.View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4"
                        entering={FadeInDown.delay(600).duration(1000).springify()}
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
                    {/* Register Button */}
                    <Animated.View
                        entering={FadeInDown.delay(800).duration(1000).springify()}>
                        <TouchableOpacity
                            className="bg-primary rounded-full mt-5"
                            onPress={handleSubmit}
                        >
                            <Text className="text-white text-2xl font-semibold text-center p-2.5">
                                Register
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View className="flex-row justify-center items-center my-10 gap-x-1"
                        entering={FadeInDown.delay(900).duration(1000).springify()}
                    >
                        <Text className="text-primary font-normal">
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={handleLogin}>
                            <Text className="text-primary font-bold">Login</Text>
                        </TouchableOpacity>
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

export default CollegeSignUp