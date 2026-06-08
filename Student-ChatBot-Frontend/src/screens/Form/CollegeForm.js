import { useState, useEffect } from "react";
import {
  ScrollView,
  TextInput,
  Button,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik, FieldArray } from "formik";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';

const CollegeForm = () => {
  const [collegeName, setCollegeName] = useState("");
  const [collegeCode, setCollegeCode] = useState("");
  const [collegeLocation, setCollegeLocation] = useState("");
  const [numberOfDepartments, setNumberOfDepartments] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [collegePhone, setCollegePhone] = useState("");
  const [collegeWebsite, setCollegeWebsite] = useState("");
  const [collegePerson, setCollegePerson] = useState("");
  const [collegeFacilities, setCollegeFacilities] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [branchName, setBranchName] = useState("");
  const [fee, setFee] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [placements, setPlacements] = useState("");
  const [facilities, setFacilities] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [city, setCity] = useState("");
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleProfile = () => {
    navigation.navigate("Profile");
  }
  const handleSubmit = () => {
    const collegeData = {
      collegeName: collegeName,
      collegeCode: collegeCode,
      collegeLocation: collegeLocation,
      numberOfDepartments: numberOfDepartments,
      collegeEmail: collegeEmail,
      collegePhone: collegePhone,
      collegeWebsite: collegeWebsite,
      city: city,
      collegePerson: collegePerson,
      collegeFacilities: collegeFacilities,
      courseName: courseName,
      courseDuration: courseDuration,
      branchName: branchName,
      fee: fee,
      placements: placements,
      facilities: facilities,
      eligibility: eligibility,
      scholarship: scholarship,
    };
    console.log(collegeData);
    axios
      .post("http://192.168.225.123:5001/collegeForm", collegeData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "Ok") {
          Alert.alert("College Form Submitted");
          // navigation.navigate("CollegeLogin");
        } else {
          Alert.alert("College Form Failed", JSON.stringify(res.data));
        }
      });
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView className='flex-1 p-4'>
        <View className='flex-row justify-between items-center mb-5'>
          <TouchableOpacity
            className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center"
            onPress={handleGoBack}
          >
            <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
          </TouchableOpacity>
          <Text className="text-3xl font-semibold text-primary">College Form</Text>
          <TouchableOpacity
            className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center"
            onPress={handleProfile}
          >
            <Ionicons name="menu" size={32} color="#45484A" />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="text-lg font-bold">College Name</Text>
          <TextInput
            placeholder="Enter College Name"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setCollegeName(e.nativeEvent.text)}
          />
          <Text className="text-lg font-bold">College Code</Text>
          <TextInput
            placeholder="Enter College Code"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setCollegeCode(e.nativeEvent.text)}
          />
          <Text className="text-lg font-bold">College Location</Text>
          <TextInput
            placeholder="Enter College Location"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setCollegeLocation(e.nativeEvent.text)}
          />
          <Text className="text-lg font-bold">Number of Departments</Text>
          <TextInput
            placeholder="Enter Number of Departments"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setNumberOfDepartments(e.nativeEvent.text)}
          />
          <Text className="text-lg font-bold">College Email</Text>
          <TextInput
            placeholder="Enter College Email"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setCollegeEmail(e.nativeEvent.text)}
          />
          <Text className="text-lg font-bold">College Phone</Text>
          <TextInput
            placeholder="Enter College Phone"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setCollegePhone(e.nativeEvent.text)}
          />
          <Text className="text-lg font-bold">College Website</Text>
          <TextInput
            placeholder="Enter College Website"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setCollegeWebsite(e.nativeEvent.text)}
          />
          <Text className="text-lg font-bold">College City</Text>
          <TextInput
            placeholder="Enter College City"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setCity(e.nativeEvent.text)}
            />
          <Text className="text-lg font-bold">College Director</Text>
          <TextInput
            placeholder="Enter College Director Name"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setCollegePerson(e.nativeEvent.text)}
          />
          <Text className="text-lg font-bold">College Facilities</Text>
          <TextInput
            placeholder="Enter College Facilities"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setCollegeFacilities(e.nativeEvent.text)}
          />
          {/* Courses */}
          <Text className="text-lg font-bold">Courses Name</Text>
          <TextInput
            placeholder="Enter Course Name"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setCourseName(e.nativeEvent.text)}
          />
          <Text className="text-lg font-bold">Courses Duration</Text>
          <TextInput
            placeholder="Enter Course Duration"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setCourseDuration(e.nativeEvent.text)}
          />
          <Text className="text-lg font-bold">Branch Name</Text>
          <TextInput
            placeholder="Enter Branch Name"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setBranchName(e.nativeEvent.text)}
          />
          <Text className="text-lg font-bold">Fee</Text>
          <TextInput
            placeholder="Enter Fee"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setFee(e.nativeEvent.text)}
          />
          <Text className="text-lg font-bold">Placements</Text>
          <TextInput
            placeholder="Enter Placements"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setPlacements(e.nativeEvent.text)}
          />
          <Text className="text-lg font-bold">Facilities</Text>
          <TextInput
            placeholder="Enter Facilities"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setFacilities(e.nativeEvent.text)}
          />
          <Text className="text-lg font-bold">Eligibility</Text>
          <TextInput
            placeholder="Enter Eligibility"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setEligibility(e.nativeEvent.text)}
          />
          <Text className="text-lg font-bold">Scholarship</Text>
          <TextInput
            placeholder="Enter Scholarship"
            className="border-b border-gray-400 mb-4"
            onChange={(e) => setScholarship(e.nativeEvent.text)}
          />
        </View>
        <View className="my-5">
          <TouchableOpacity
            className="bg-primary rounded-full mt-5"
            onPress={() => handleSubmit()}
          >
            <Text className="text-white text-2xl font-semibold text-center p-2.5">
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CollegeForm