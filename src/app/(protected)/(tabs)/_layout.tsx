import { COLORS } from '@/src/constants/theme';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';


export default function TabsLayout() {
  return (
     <Tabs screenOptions={{ 
      tabBarShowLabel:true,
      tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "grey",
        headerShown: false }}> 

      <Tabs.Screen
        name="index"
        options={{
        title: 'Home',
        tabBarIcon: ({size,color}) => <Ionicons name="home" size={size} color= {color} />,
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          title: 'Communities',
        tabBarIcon: ({size,color}) => <Ionicons name="compass" size={size} color= {color} />,
        }}
      />
     <Tabs.Screen
        name="chats"
        options={{
        title: 'Chats',
        tabBarIcon: ({size,color}) => <Ionicons name="chatbubble" size={size} color= {color} />,
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
        tabBarIcon: ({size,color}) => <Feather name="plus-square" size={size} color= {COLORS.background} />,
        }}
      />

     <Tabs.Screen
        name="marketplace"
        options={{
        title: 'MarketPlace',
        tabBarIcon: ({size,color}) => <Ionicons name="notifications" size={size} color= {color} />,
        }}
      />
     <Tabs.Screen
        name="profile"
        options={{
        title: 'Profiles',
        tabBarIcon: ({size,color}) => <Ionicons name="person" size={size} color= {color} />,
        }}
      />
     </Tabs>
  )
}