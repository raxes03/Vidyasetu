import { View, Text, StatusBar } from 'react-native'
import { useState, useEffect } from 'react'
import { addEventListener } from '@react-native-community/netinfo'
import AppNavigation from './src/router/appNavigation'
import ToartMessage from './src/components/ToartMessage'
import AsyncStorage from '@react-native-async-storage/async-storage'

const App = () => {
  const [isConnected, setIsConnected] = useState('')
  const [toast, setToast] = useState(true)
  const [toastTitle, setToastTitle] = useState('')
  const [toastDes, setToastDes] = useState('')
  const [toastType, setToastType] = useState('')


  const handleToast = (title, des, type) => {
    setToastTitle(title)
    setToastDes(des)
    setToastType(type)
  }
  const handleNet = () => {
    if (isConnected == 'false') {
      handleToast("No Internet Connection", "Please check your internet connection", "warning")
      setToast(true)
    }
    if (isConnected == 'true') {
      handleToast("Internet Connected", "You are connected to internet", "Ok")
      setToast(true)
    }
  }

  const handleOnPress = () => {
    setToast(false);
  }
  const handleNetInfo = () => {
    addEventListener((state) => {
      setIsConnected(state.isConnected.toString())     
    })
  }
  useEffect(() => {
    handleNetInfo()
    handleNet()
    // setTimeout(() => {
    //   setToast(false)
    // }, 2000)
  }, [isConnected])
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <AppNavigation/>
      {toast && <ToartMessage title={toastTitle} des={toastDes} type={toastType} onPress={handleOnPress} />}
    </>
  )
}

export default App