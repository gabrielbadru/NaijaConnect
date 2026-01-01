
import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'


export default function login() {
  return (
    <View >
      <Text> login </Text>
        <Link href={"/(protected)/(tabs)"}>
    GO TO INDEX
    </Link>
    </View>
  )
}

