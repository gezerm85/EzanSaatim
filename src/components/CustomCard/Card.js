import { Text, View } from 'react-native'
import React from 'react'
import styles from './Card.style'

const Card = ({item}) => {
  return (
    <View style={styles.container} >
        <View style={styles.innerContainer}>
            <Text style={styles.titleHour} >{item.vakit}:</Text>
            <Text style={styles.titleTime}>{item.saat}</Text>
        </View>
    </View>
  )
}

export default Card
