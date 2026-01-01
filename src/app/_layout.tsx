import { Stack } from "expo-router"
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function _layout() {
  return (
    <SafeAreaProvider>
<SafeAreaView style={{flex: 1 , backgroundColor:  "#4ADE80"}}>
  <Stack screenOptions={{ headerShown: false }} />
</SafeAreaView>
    </SafeAreaProvider>
  )
}