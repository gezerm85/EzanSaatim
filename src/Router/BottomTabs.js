import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../pages/Settings/Settings';
import MyStack from './MyStack';
import { Map } from '../pages/Map';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


const BottomTabs = () => {
  return (
    <Tab.Navigator
      

      screenOptions={{
        headerStyle: {
          backgroundColor: '#444db3',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        title: 'Ezan Saatim',
        headerTitleStyle:{
          fontWeight: 'semibold',
          fontSize: 23,
        },
        tabBarActiveTintColor: '#444db3',
        tabBarInactiveTintColor: '#969696',
      }}
    >
      <Tab.Screen options={{tabBarIcon:({color})=>(
        <Entypo name="home" size={24} color={color} />
      ), tabBarShowLabel: false,}} name="HomePage" component={MyStack} />
      <Tab.Screen options={{tabBarIcon:({color})=>(
        <MaterialIcons name="mosque" size={24} color={color} />
      ), tabBarShowLabel: false,}} name="Map" component={Map} />
      <Tab.Screen options={{tabBarIcon:({color})=>(
        <Entypo name="grid" size={30} color={color} />
      ), tabBarShowLabel: false,}} name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}

export default BottomTabs
