import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const Error = () => {
  return (
      <LottieView style={styles.container} source={require('../../../assets/animations/Error.json')} autoPlay />
  )
}

export default Error

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
})