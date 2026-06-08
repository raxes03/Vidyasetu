import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FadeInUp } from 'react-native-reanimated';
import { useState, useEffect } from 'react'

const ToartMessage = (
    {
        title = 'Title',
        des = 'Description',
        type = 'info',
        onPress = () => { },
    }
) => {
    return (
        <>
            <Animated.View
                className="items-center py-20 flex gap-y-10"
                style={StyleSheet.absoluteFill}
                entering={FadeInUp.duration(1000).springify()}
            >
                {/* Card */}
               {type == "info" && <View
                    className={`relative flex items-start rounded-md bg-blue-100`}
                >
                    {/* Icon */}
                    <View className={`absolute -top-6 left-3 rounded-full bg-blue-50 p-2`}>
                        <Feather name="info" size={24} color="blue" />
                    </View>
                    {/* Content */}
                    <View className='flex h-28 w-96 rounded-md flex-row overflow-hidden'>
                        {/* Bubble */}
                        <View className='relative h-full min-w-20 max-w-36'>
                            <View className={`absolute w-24 h-24 -bottom-6 -left-12 rounded-full bg-blue-200`} />
                            <View className={`absolute w-16 h-16 -bottom-6 left-1 rounded-full bg-blue-300/60`} />
                            <View className={`absolute w-3 h-3 bottom-16 left-8 rounded-full bg-blue-300/80`} />
                            {/* Text */}
                        </View>
                        <View className='ml-[20%] mt-3'>
                            <View className='mb-1 flex-row gap-2 justify-between items-center w-full'>
                                <Text className={`text-xl font-semibold text-blue-500`}>{title}</Text>
                                <View className=''>
                                    <TouchableOpacity className='mr-2 p-1' onPress={onPress}>
                                        <Entypo name="cross" size={24} color="blue" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text className={`text-sm text-blue-400`}>{des}</Text>
                        </View>
                    </View>
                </View>}
                {/* Error */}
                {type == "error" &&  <View
                    className={`relative flex items-start rounded-md bg-red-100`}
                >
                    {/* Icon */}
                    <View className={`absolute -top-6 left-3 rounded-full bg-red-50 p-2`}>
                        <Feather name="alert-triangle" size={24} color="red" />
                    </View>
                    {/* Content */}
                    <View className='flex h-28 w-96 rounded-md flex-row overflow-hidden'>
                        {/* Bubble */}
                        <View className='relative h-full min-w-20 max-w-36'>
                            <View className={`absolute w-24 h-24 -bottom-6 -left-12 rounded-full bg-red-200`} />
                            <View className={`absolute w-16 h-16 -bottom-6 left-1 rounded-full bg-red-300/60`} />
                            <View className={`absolute w-3 h-3 bottom-16 left-8 rounded-full bg-red-300/80`} />
                            {/* Text */}
                        </View>
                        <View className='ml-[20%] mt-3'>
                            <View className='mb-1 flex-row gap-2 justify-between items-center w-full'>
                                <Text className={`text-xl font-semibold text-red-500`}>{title}</Text>
                                <View className=''>
                                    <TouchableOpacity className='mr-2 p-1' onPress={onPress}>
                                        <Entypo name="cross" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text className={`text-sm text-red-400`}>{des}</Text>
                        </View>
                    </View>
                </View>}
                {/* Warning */}
                {type == "warning" && <View
                    className={`relative flex items-start rounded-md bg-orange-100`}
                >
                    {/* Icon */}
                    <View className={`absolute -top-6 left-3 rounded-full bg-orange-50 p-2`}>
                        <Feather name="alert-circle" size={24} color="orange" />
                    </View>
                    {/* Content */}
                    <View className='flex h-28 w-96 rounded-md flex-row overflow-hidden'>
                        {/* Bubble */}
                        <View className='relative h-full min-w-20 max-w-36'>
                            <View className={`absolute w-24 h-24 -bottom-6 -left-12 rounded-full bg-orange-200`} />
                            <View className={`absolute w-16 h-16 -bottom-6 left-1 rounded-full bg-orange-300/60`} />
                            <View className={`absolute w-3 h-3 bottom-16 left-8 rounded-full bg-orange-300/80`} />
                            {/* Text */}
                        </View>
                        <View className='ml-[20%] mt-3'>
                            <View className='mb-1 flex-row gap-2 justify-between items-center w-full'>
                                <Text className={`text-xl font-semibold text-orange-500`}>{title}</Text>
                                <View className=''>
                                    <TouchableOpacity className='mr-2 p-1' onPress={onPress}>
                                        <Entypo name="cross" size={24} color="orange" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text className={`text-sm text-orange-400`}>{des}</Text>
                        </View>
                    </View>
                </View>}
                {/* Success */}
                {type == "Ok" &&  <View
                    className={`relative flex items-start rounded-md bg-green-100`}
                >
                    {/* Icon */}
                    <View className={`absolute -top-6 left-3 rounded-full bg-blue-50 p-2`}>
                        <AntDesign name="checkcircleo" size={24} color="green" />
                    </View>
                    {/* Content */}
                    <View className='flex h-28 w-96 rounded-md flex-row overflow-hidden'>
                        {/* Bubble */}
                        <View className='relative h-full min-w-20 max-w-36'>
                            <View className={`absolute w-24 h-24 -bottom-6 -left-12 rounded-full bg-green-200`} />
                            <View className={`absolute w-16 h-16 -bottom-6 left-1 rounded-full bg-green-300/60`} />
                            <View className={`absolute w-3 h-3 bottom-16 left-8 rounded-full bg-green-300/80`} />
                            {/* Text */}
                        </View>
                        <View className='ml-[20%] mt-3'>
                            <View className='mb-1 flex-row gap-2 justify-between items-center w-full'>
                                <Text className={`text-xl font-semibold text-green-500`}>{title}</Text>
                                <View className=''>
                                    <TouchableOpacity className='mr-2 p-1' onPress={onPress}>
                                        <Entypo name="cross" size={24} color="green" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text className={`text-sm text-green-400`}>{des}</Text>
                        </View>
                    </View>
                </View> }
            </Animated.View>
        </>
    )
}

export default ToartMessage









