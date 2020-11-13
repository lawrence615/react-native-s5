import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'

import DefaultStyles from '../constants/default-styles'

const generateNumberBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min

  if (rndNum === exclude) {
    // perform a recursion (concept of calling a function from inside the same function)
    return generateNumberBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

// const renderListItem = (value, numOfAttempt) => (
//   <View key={value} style={styles.listItem}>
//     <BodyText>#{numOfAttempt}</BodyText>
//     <BodyText>{value}</BodyText>
//   </View>
// )

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
)

const GameScreen = props => {

  const initialGuess = generateNumberBetween(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastAttempts, setPastAttempts] = useState([initialGuess.toString()])
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const { userChoice, onGameOver } = props

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width)
      setAvailableDeviceHeight(Dimensions.get('window').height)
    }

    Dimensions.addEventListener('change', updateLayout)

    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  })
  useEffect(() => {
    if (currentGuess === userChoice) { onGameOver(pastAttempts.length) }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert('Don\'t lie!', 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }])
      return
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess + 1
    }
    const nextNumber = generateNumberBetween(currentHigh.current, currentLow.current, currentGuess)
    setCurrentGuess(nextNumber)
    // setAttempts(curAttempts => curAttempts + 1)
    // setPastAttempts(curPastAttempt => [nextNumber, ...curPastAttempt])
    setPastAttempts(curPastAttempt => [nextNumber.toString(), ...curPastAttempt])
  }

  let listContainerStyle = styles.listContainer
  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.titleText}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onClick={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onClick={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
          {/* <Card style={styles.buttonContainer}>
        </Card> */}
        </View>
        <View style={listContainerStyle}>
          {/* <ScrollView contentContainerStyle={styles.list}>
            {pastAttempts.map((attempt, index) => renderListItem(attempt, pastAttempts.length - index))}
          </ScrollView> */}
          <FlatList
            keyExtractor={item => item}
            data={pastAttempts}
            renderItem={renderListItem.bind(this, pastAttempts.length)}
            contentContainerStyle={styles.list} />
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.titleText}>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <MainButton onClick={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <MainButton onClick={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </Card>
        <View style={styles.listContainer}>
          {/* <ScrollView contentContainerStyle={styles.list}>
            {pastAttempts.map((attempt, index) => renderListItem(attempt, pastAttempts.length - index))}
          </ScrollView> */}
          <FlatList
            keyExtractor={item => item}
            data={pastAttempts}
            renderItem={renderListItem.bind(this, pastAttempts.length)}
            contentContainerStyle={styles.list} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,// meaning it shall take all the space available below the header
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginTop: 20,
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 250,
    maxWidth: '90%'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  },
  listContainer: {
    flex: 1,
    width: '60%'
  },
  listContainerBig: {
    flex: 1,
    width: '80%'
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
})

export default GameScreen