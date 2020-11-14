import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Colours from '../constants/colours'

const MainButton = props => {
  return (
      <TouchableOpacity activeOpacity={0.6} onPress={props.onClick}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colours.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans-regular',
    fontSize: 18
  }
})

export default MainButton