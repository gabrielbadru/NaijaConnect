import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

export default function signup() {
  return (
    <View>
      <Text>signup</Text>
       <Link href = {"/(protected)/(tabs)"}> GO  TO PROFILES </Link>
    </View>
  )
}