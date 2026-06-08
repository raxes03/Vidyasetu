import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import { setItem } from "../utils/asyncStorage";
import { COLORS } from "../theme/theme";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  const [onboarding, setOnboarding] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setOnboarding(true);
    }, 3000);
  }, [])

  const handleLogin = async () => {
    // await setItem("onboarding", "1");
    navigation.navigate("Panal");
  };

  return (
    <View style={styles.container}>
      {onboarding ? (

        <Onboarding
          onSkip={handleLogin}
          onDone={handleLogin}
          controlStatusBar={false}
          bottomBarHighlight={false}
          DotComponent={({ selected }) => (
            <View
              style={{
                width: selected ? 30 : 10,
                height: 10,
                marginHorizontal: 3,
                backgroundColor: selected ? COLORS.secondary : "#D3D3D3",
                borderRadius: 5,
                marginBottom: 20,
              }}
            />
          )}
          NextButtonComponent={({ ...props }) => (
            <TouchableOpacity
              style={{
                marginHorizontal: 20,
                marginBottom: 20,
                padding: 10,
                backgroundColor: COLORS.secondary,
                borderRadius: 5,
              }}
              {...props}
            >
              <Text style={{ color: "white" }}>Next</Text>
            </TouchableOpacity>
          )}
          DoneButtonComponent={({ ...props }) => (
            <TouchableOpacity
              style={{
                marginHorizontal: 20,
                marginBottom: 20,
                padding: 10,
                backgroundColor: COLORS.secondary,
                borderRadius: 5,
              }}
              {...props}
            >
              <Text style={{ color: "white" }}>Done</Text>
            </TouchableOpacity>
          )}
          SkipButtonComponent={({ ...props }) => (
            <TouchableOpacity
              style={{
                marginHorizontal: 20,
                marginBottom: 20,
                padding: 10,
                backgroundColor: COLORS.secondary,
                borderRadius: 5,
              }}
              {...props}
            >
              <Text style={{ color: "white" }}>Skip</Text>
            </TouchableOpacity>
          )}
          pages={[
            {
              backgroundColor: "#fff",
              image: (
                <LottieView
                  source={require("../assets/lottie/4.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              ),
              title: "Welcome Students",
              subtitle: "ChatBot designed to support students in their learning",
            },
            {
              backgroundColor: "#fff",
              image: (
                <LottieView
                  source={require("../assets/lottie/3.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              ),
              title: "Help in Admissions",
              subtitle: "Designed to help you plan your college",
            },
            {
              backgroundColor: "#fff",
              image: (
                <LottieView
                  source={require("../assets/lottie/7.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              ),
              title: "College Journey",
              subtitle: "Your Journey to becoming a better student starts here",
            },
          ]}
        />
      ) : (
        <SafeAreaView className='flex-1 justify-center items-center'>
          <Animated.Image
            entering={BounceIn.delay(200).duration(1000)}
            source={require("../assets/image/VIDYASETU.png")}
            style={{ width: width - 20, height: height / 2 }}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: width * 2,
    height: width,
  },
});
