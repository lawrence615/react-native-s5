import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'

import TitleText from '../components/TitleText'
import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton'

import Colours from '../constants/colours'


const GameOverScreen = props => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>Game Over!!!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/success.png')}
            // source={{uri:'https://cdn.pixabay.com/photo/2015/04/12/17/51/dominoes-719199_1280.jpg'}}
            style={styles.image}
            resizeMode="cover" />
        </View>
        <View style={styles.resultsContainer}><BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.attemptsCount}</Text> attempts to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></BodyText></View>
        <MainButton onClick={props.onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,// meaning it shall take all the space available below the header
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical:10
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30
  },
  image: {
    width: '100%',
    height: '100%'
  },
  resultsContainer: {
    marginHorizontal: 15,
    marginVertical: Dimensions.get('window').height / 60
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20
  },
  highlight: {
    color: Colours.primary,
    fontFamily: 'open-sans-bold'
  }
})

export default GameOverScreen