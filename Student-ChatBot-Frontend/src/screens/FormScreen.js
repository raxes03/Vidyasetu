import React, { useState } from "react";
import {
  ScrollView,
  TextInput,
  Button,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Formik, FieldArray } from "formik";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios'

const FormScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    try {
      axios
        .port(
          ""
        )
    } catch (e) {

    }
  }

  const initialFormValues = {
    city: "",
    colleges: [
      {
        name: "",
        img: "",
        courses: [
          {
            name: "",
            duration: "",
            fees: "",
          },
        ],
        contact: {
          email: "",
          phone: "",
          address: "",
          website: "",
        },
      },
    ],
  };

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={(values) => console.log(values)}
      className="bg-white"
    >
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <ScrollView className={`p-4 bg-white`}>
          <View className='flex-row justify-between p-2'>
            <TouchableOpacity className="h-10 w-10 bg-gray-300 justify-center items-center rounded-full">
              <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
            </TouchableOpacity>
            <Text className="text-center font-semibold text-2xl">Form</Text>
            <TouchableOpacity className="h-10 w-10 bg-gray-300 justify-center items-center rounded-full">
              <Ionicons name="menu" size={32} color="#45484A" />
            </TouchableOpacity>
          </View>
          {/* City Input */}
          <Text className={`text-lg mb-2`}>City</Text>
          <TextInput
            className={`border p-2 mb-4`}
            value={values.city}
            onChangeText={handleChange("city")}
            placeholder="Enter city name"
          />

          <FieldArray name="colleges">
            {({ push, remove }) => (
              <>
                {values.colleges.map((college, index) => (
                  <View key={index} className={`mb-6`}>
                    {/* College Name */}
                    <Text className={`text-lg mb-2`}>College {index + 1}</Text>
                    <TextInput
                      className={`border p-2 mb-4`}
                      value={college.name}
                      onChangeText={handleChange(`colleges[${index}].name`)}
                      placeholder="College Name"
                    />
                    {/* College Image */}
                    <TextInput
                      className={`border p-2 mb-4`}
                      value={college.img}
                      onChangeText={handleChange(`colleges[${index}].img`)}
                      placeholder="Image URL"
                    />

                    {/* Courses */}
                    <FieldArray name={`colleges[${index}].courses`}>
                      {({ push: pushCourse, remove: removeCourse }) => (
                        <>
                          {college.courses.map((course, courseIndex) => (
                            <View key={courseIndex} className={`mb-4`}>
                              <Text className={`text-base mb-2`}>
                                Course {courseIndex + 1}
                              </Text>
                              <TextInput
                                className={`border p-2 mb-2`}
                                value={course.name}
                                onChangeText={handleChange(
                                  `colleges[${index}].courses[${courseIndex}].name`
                                )}
                                placeholder="Course Name"
                              />
                              <TextInput
                                className={`border p-2 mb-2`}
                                value={course.duration}
                                onChangeText={handleChange(
                                  `colleges[${index}].courses[${courseIndex}].duration`
                                )}
                                placeholder="Course Duration"
                              />
                              <TextInput
                                className={`border p-2 mb-2`}
                                value={course.fees}
                                onChangeText={handleChange(
                                  `colleges[${index}].courses[${courseIndex}].fees`
                                )}
                                placeholder="Course Fees"
                              />
                              <Button
                                title="Remove Course"
                                color="red"
                                onPress={() => removeCourse(courseIndex)}
                              />
                            </View>
                          ))}
                          <Button
                            title="Add Course"
                            onPress={() =>
                              pushCourse({ name: "", duration: "", fees: "" })
                            }
                          />
                        </>
                      )}
                    </FieldArray>

                    {/* Contact Information */}
                    <Text className={`text-base mb-2`}>Contact Info</Text>
                    <TextInput
                      className={`border p-2 mb-2`}
                      value={college.contact.email}
                      onChangeText={handleChange(
                        `colleges[${index}].contact.email`
                      )}
                      placeholder="Email"
                    />
                    <TextInput
                      className={`border p-2 mb-2`}
                      value={college.contact.phone}
                      onChangeText={handleChange(
                        `colleges[${index}].contact.phone`
                      )}
                      placeholder="Phone"
                    />
                    <TextInput
                      className={`border p-2 mb-2`}
                      value={college.contact.address}
                      onChangeText={handleChange(
                        `colleges[${index}].contact.address`
                      )}
                      placeholder="Address"
                    />
                    <TextInput
                      className={`border p-2 mb-2`}
                      value={college.contact.website}
                      onChangeText={handleChange(
                        `colleges[${index}].contact.website`
                      )}
                      placeholder="Website"
                    />

                    <Button
                      title="Remove College"
                      color="red"
                      onPress={() => remove(index)}
                    />
                  </View>
                ))}
                <Button
                  title="Add College"
                  onPress={() =>
                    push({
                      name: "",
                      img: "",
                      courses: [{ name: "", duration: "", fees: "" }],
                      contact: {
                        email: "",
                        phone: "",
                        address: "",
                        website: "",
                      },
                    })
                  }
                />
              </>
            )}
          </FieldArray>

          <Button title="Submit" onPress={handleSubmit} />
        </ScrollView>
      )}
    </Formik>
  );
};

export default FormScreen;
