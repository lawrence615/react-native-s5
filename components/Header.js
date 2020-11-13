import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import TitleText from './TitleText'
import Colours from '../constants/colours'

const Header = props => {
  return (
    <View style={styles.header}>
      <TitleText>{props.title}</TitleText>
    </View >
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Colours.primary,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Header